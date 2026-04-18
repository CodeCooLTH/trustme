# Agent Team Workflow — Mandatory Process

> **Every multi-step phase (P1, P2, …, R1-R11, etc.) MUST use an agent team, not a single-threaded build.**
>
> Background: P1 was built single-threaded and violated the theme-copy rule across 10 pages without a checkpoint. An independent reviewer agent would have caught the drift at page #2. See `docs/retro/2026-04-18-p1-retrospective.md`.

## Team roles

| Role | Subagent type | When to dispatch |
|---|---|---|
| **Controller** | (the main Claude session) | Coordinates the phase, tracks tasks, integrates agent outputs, makes final go/no-go calls |
| **Planner** | `Plan` | Before a phase starts — produce step plan + file list + theme-source mapping |
| **Explorer** | `Explore` | When unsure which theme file to copy or how an existing piece of code works — use BEFORE writing |
| **Developer** | `general-purpose` (or `feature-dev:code-architect` for design work) | Per independent task; can be run in parallel for independent tasks |
| **Reviewer** | `feature-dev:code-reviewer` or `superpowers:code-reviewer` | After EACH developer agent reports back, before the Controller marks a task complete |
| **QA** | `general-purpose` (uses `mcp__chrome-devtools__*` tools) | After Reviewer passes, for any user-facing page task; also after each batch for integration; also at end-of-phase. See the 3-level cadence below. |
| **Architect sweep** | `feature-dev:code-architect` | End of phase — sanity-check the whole phase for structural coherence |

The Controller is the only role that may commit, update task state, or claim a task complete. Developer agents *propose* work; Reviewers *flag* issues; the Controller *decides*.

## Parallelism

- **Independent tasks → parallel.** If two tasks touch different files and have no sequential dependency, dispatch both developer agents in the **same tool message** (multiple `Agent` calls).
- **Dependent tasks → sequential.** If task B needs task A's output, run A → review → B.
- **Review is never parallelized with the work it reviews.** Always developer → review, never developer alongside reviewer of the same thing.
- **Batch size ceiling: 3 concurrent developer agents.** More than 3 overloads the Controller's integration step; break larger phases into sub-batches.

## Mandatory checkpoints

Every task passes through five gates before being marked complete:

1. **Plan** — a named theme source file path + target path + scope (one or two sentences). No plan → don't dispatch.
2. **Develop** — Developer agent executes; reports file diffs + commands run + any blockers.
3. **Review** — Reviewer agent independently checks against project conventions:
   - Does the commit cite a `Base:` theme file? (hard rule 3)
   - Did the developer actually `Read` that theme file before writing? (hard rule 1)
   - Is the output sourced from the theme, or recomposed from primitives?
   - Does it honor RSC navigation rules? (hard rule 2)
   - TypeScript clean?
4. **QA** — QA agent exercises the page in a real browser via the Chrome DevTools MCP. See the 3-level cadence below. Required for any task that produces a user-facing page or flow; skipped only for pure-infrastructure tasks (e.g. R1 shell copies that have no standalone URL).
5. **Integrate** — Controller reads the review + QA findings, decides pass/fail. On fail, re-dispatch Developer with the review + QA findings. On pass, commit and mark task complete.

## 3-level QA cadence (required)

Type-check and code review alone do NOT prove a feature works. QA via Chrome DevTools MCP is mandatory at three levels. **Level 2 and 3 are functional E2E tests, not smoke tests** — they actually fill forms, submit data, verify persistence, and walk cross-subdomain flows.

| Level | When | Scope | What it actually does |
|---|---|---|---|
| **Per-task smoke** | After Reviewer pass on a user-facing task | Load + render check only, ~60s | Navigate to the new page URL; `take_snapshot`; assert key headings/forms/widgets appear; `list_console_messages` and fail on runtime errors. No form submission. |
| **Batch integration** | After every batch of ≤3 tasks | **Functional E2E across the batch**, ~5min | Drive each form with realistic input (`fill_form`, `click`, `wait_for`); verify optimistic UI updates; verify DB persistence by navigating to a read-back page and finding the new data; verify toasts/status chips change; check `list_console_messages` for errors throughout. Tests the happy path + at least one negative path (e.g. wrong OTP, invalid input). |
| **End-of-phase** | Last task of the phase | **Full PRD feature walk with cross-subdomain flows**, ~15min | Execute every PRD FR applicable to the phase. Includes cross-subdomain end-to-end: e.g. **seller creates order on `seller.deepth.local:4000` → copy `/o/{token}` → open on `deepth.local:4000` as buyer → enter OTP → confirm → submit review → navigate to `/u/{sellerUsername}` → verify rating bumped**. Produces PASS/FAIL per FR. |

### Example QA agent scenarios for SafePay buyer

**Per-task smoke** (after R5 /reviews):
- Navigate to `http://deepth.local:4000/reviews` (logged in).
- Snapshot; assert "รีวิวที่ให้" heading, filter input, table/list container render.
- No console errors.

**Batch integration** (after R5/R6/R7 — reviews / profile / verification):
- Sign in (real OTP via `/api/otp/send` + dev log read).
- Go to `/settings/profile` → change `displayName` → click "บันทึก" → expect toast → reload → assert new name appears on dashboard welcome.
- Go to `/settings/verification` → upload two small PNGs as L2 → submit → expect toast + status chip → reload → chip still "กำลังตรวจสอบ".
- Go to `/reviews` → if reviews exist, verify shop link goes to correct `/u/{username}`. If none, verify empty state copy.
- Throughout: `list_console_messages` shows no errors.

**End-of-phase** (R11 — full buyer PRD walk):
- FR-1 auth: register via phone OTP, verify dashboard loads.
- FR-2 verify: submit L2 docs; direct DB flip status=APPROVED; reload and assert L2 chip is "ยืนยันแล้ว".
- FR-5/6 order: seed an order for the test buyer via prisma; navigate to `/o/{token}`; enter OTP; confirm; expect status → CONFIRMED.
- FR-7 review: submit 5-star review on the confirmed order; verify seller `/u/{username}` shows the review with correct stars + comment.
- FR-8 history linking: create a guest review before signup; then sign up with the same phone; verify the review shows up in `/reviews`.
- FR-9 public profile: visit `/u/{sellerUsername}` while logged out; verify trust score, badges, reviews render.
- Cross-subdomain: log into `seller.deepth.local:4000`; create an order; copy link; open `/o/{token}` on `deepth.local:4000`; confirm; verify trust score bumped on seller.

### Operating rules

- **The user runs the dev server themselves on port 4000.** QA agents must NOT start a server. If `curl http://deepth.local:4000/` fails, the agent reports back to the Controller instead of starting one.
- **Always use the real dev subdomains** (`http://deepth.local:4000`, `seller.deepth.local:4000`, `admin.deepth.local:4000`) — NOT `localhost` — because `src/proxy.ts` routes by subdomain and cookies are per-host. See `feedback_qa_domains.md` memory.
- **Seed data via direct Prisma** for complex setup (creating test sellers/products/orders). `.env.local` points to the Supabase instance the dev server uses — source it when running tsx scripts.
- **OTP codes** are logged to the dev server stdout (`/tmp/dev.log` or wherever the user has the server writing) — tail the log to grab them.
- **Cleanup** test data at end of QA agent run when possible (delete seeded sellers/orders) so subsequent QA runs start clean.
- **Report format:** PASS/FAIL per scenario with the specific evidence (screenshot filename, assertion output, console error excerpt). Recommend MERGE or REWORK for the Controller.

No skipping gates — even "obviously trivial" tasks get a reviewer pass. Trivial tasks return fast reviews; cost is low.

## Per-phase retrospective (mandatory)

After every phase completes (all tasks done, final QA green):

1. Controller spawns a retro step — can be done in-session (structured reflection) or via an agent. Either works; the artifact matters.
2. Produce `docs/retro/YYYY-MM-DD-<phase-name>.md` covering:
   - **Problems** — what went wrong, with evidence (file paths, error messages, commit hashes).
   - **Root causes** — at least one "why" for each problem.
   - **Conventions to adopt** — written as actionable rules, not vague guidance.
   - **What went right** — anchors worth repeating.
   - **Action items** — numbered list of concrete follow-ups.
3. For any convention identified:
   - If it's a rule Claude must follow every session → add to `CLAUDE.md` (as a hard rule) AND `docs/conventions/<topic>.md` (detailed workflow).
   - If it's a personal-Claude reminder → `~/.claude/.../memory/feedback_<topic>.md` + add a line to `MEMORY.md`.
   - If it's a team-wide process → only `docs/conventions/`.
4. Controller commits the retro + any convention updates as a separate commit at the end of the phase. Do not bundle with feature work.

## Writing an effective developer-agent prompt

Developer agents start with zero conversation context. The prompt must be self-contained:

- **Goal** (one sentence).
- **Target file(s)** to create or modify — absolute paths.
- **Theme source to copy** — absolute path; the agent must `Read` this first.
- **Content to adapt** — specific data fields, Thai copy, API endpoints.
- **Constraints** — type-check clean, no `component={Link}` in server components, commit with `Base:` line.
- **Done criteria** — what proves the task is complete (type-check passes, renders in browser, commit exists).
- **Format of report** — bulleted: what was done, what was skipped and why, any blockers.

Bad prompt: "Rewrite the dashboard using Vuexy."
Good prompt: "Rewrite `src/app/(marketing)/(buyer-app)/dashboard/page.tsx` as a copy of `theme/vuexy/.../apps/ecommerce/dashboard/page.tsx`. Keep the `<Grid container>` layout. Widgets to include: Congratulations (adapt to show trust score), StatisticsCard (orders/reviews/badges), Orders (recent buyer orders), Transactions (recent reviews given). Drop InvoiceListTable. Fetch data via getOrdersByBuyer/getReviewsByBuyer. Commit with `Base:` line citing the theme file. Report back with the commit hash and any widgets you had to stub."

## Writing an effective reviewer-agent prompt

- **What to review** — the commit hash (or file paths) the developer produced.
- **Checklist** — the specific hard rules + conventions to verify.
- **Output format** — PASS / FAIL with specific findings and line numbers.

Keep the reviewer agent INDEPENDENT — don't pre-bias with "I think it's fine". The whole point is an independent second opinion.

## When NOT to use agent teams

- Single-file, single-concept changes (e.g. fixing a typo).
- Pure exploration questions that a `Grep` or `Read` in the Controller can answer in under 30 seconds.
- Debugging an active failure where the Controller already has full context — delegating adds latency.

But "I'll just do it quickly myself" is a trap for multi-page phases. If the phase has ≥3 tasks, dispatch agents.

## TODO → task integration

- Each subtask corresponds to one TaskCreate entry (subject line = agent task title).
- Developer agent claims the task (Controller updates `owner`).
- After review pass, Controller marks the task completed.
- If rework needed, Controller leaves the task in_progress and re-dispatches.
