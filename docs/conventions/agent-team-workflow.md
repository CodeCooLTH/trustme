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
| **Architect sweep** | `feature-dev:code-architect` | End of phase — sanity-check the whole phase for structural coherence |

The Controller is the only role that may commit, update task state, or claim a task complete. Developer agents *propose* work; Reviewers *flag* issues; the Controller *decides*.

## Parallelism

- **Independent tasks → parallel.** If two tasks touch different files and have no sequential dependency, dispatch both developer agents in the **same tool message** (multiple `Agent` calls).
- **Dependent tasks → sequential.** If task B needs task A's output, run A → review → B.
- **Review is never parallelized with the work it reviews.** Always developer → review, never developer alongside reviewer of the same thing.
- **Batch size ceiling: 3 concurrent developer agents.** More than 3 overloads the Controller's integration step; break larger phases into sub-batches.

## Mandatory checkpoints

Every task passes through four gates before being marked complete:

1. **Plan** — a named theme source file path + target path + scope (one or two sentences). No plan → don't dispatch.
2. **Develop** — Developer agent executes; reports file diffs + commands run + any blockers.
3. **Review** — Reviewer agent independently checks against project conventions:
   - Does the commit cite a `Base:` theme file? (hard rule 3)
   - Did the developer actually `Read` that theme file before writing? (hard rule 1)
   - Is the output sourced from the theme, or recomposed from primitives?
   - Does it honor RSC navigation rules? (hard rule 2)
   - TypeScript clean? Browser renders?
4. **Integrate** — Controller reads the review, decides pass/fail. On fail, re-dispatch Developer with the review's findings. On pass, commit and mark task complete.

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
