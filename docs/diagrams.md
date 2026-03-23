# SafePay — System Diagrams

รวม Flowcharts และ Diagrams ทั้งหมดของระบบ SafePay ในรูปแบบ Mermaid

---

## 1. System Architecture

```mermaid
graph TB
    subgraph Client["Client (Browser)"]
        LP[Landing Page]
        PO[Public Order Link<br/>Mobile-first]
        CD[Customer Dashboard<br/>Sidebar + Topbar]
        AD[Admin Dashboard<br/>Sidebar + Topbar]
    end

    subgraph NextJS["Next.js App"]
        subgraph Frontend["Frontend Layer"]
            AR[App Router<br/>Server + Client Components]
        end

        subgraph API["API Layer"]
            AUTH["/api/auth/*"]
            DEALS["/api/deals/*"]
            ORDERS["/api/orders/*"]
            PAYMENTS["/api/payments/*"]
            SHIPMENTS["/api/shipments/*"]
            DISPUTES["/api/disputes/*"]
            ADMIN["/api/admin/*"]
            UPLOAD["/api/upload"]
            FILES["/api/files/*"]
        end

        subgraph Services["Service Layer"]
            DS[DealService]
            OS[OrderService]
            ES[EscrowService]
            PS[PaymentService]
            SS[ShipmentService]
            DIS[DisputeService]
            NS[NotificationService]
            PTS[PointService]
        end

        MW[Middleware<br/>Auth + Role Check]
        CRON[node-cron<br/>Auto-complete]
    end

    subgraph Storage["Storage"]
        DB[(PostgreSQL)]
        FS[File System<br/>/uploads]
    end

    Client --> MW
    MW --> API
    API --> Services
    Services --> DB
    UPLOAD --> FS
    FILES --> FS
    CRON --> ES

    style Client fill:#e1f5fe
    style NextJS fill:#fff3e0
    style Storage fill:#e8f5e9
```

---

## 2. Authentication Flow

```mermaid
sequenceDiagram
    participant U as ผู้ใช้
    participant FE as Frontend
    participant NA as NextAuth
    participant FB as Facebook
    participant DB as Database

    U->>FE: คลิก "เข้าสู่ระบบด้วย Facebook"
    FE->>NA: POST /api/auth/signin/facebook
    NA->>FB: Redirect to Facebook OAuth
    FB->>U: แสดงหน้า Facebook Login
    U->>FB: อนุญาตเข้าถึง
    FB->>NA: Callback พร้อม access token
    NA->>DB: หา user จาก facebookId

    alt ผู้ใช้ใหม่
        NA->>DB: สร้าง User (role: BUYER default)
        NA->>DB: สร้าง Account record
    end

    NA->>NA: สร้าง JWT token
    NA->>FE: Set httpOnly cookie + redirect
    FE->>U: แสดง Dashboard
```

---

## 3. Complete Escrow Flow

```mermaid
sequenceDiagram
    participant S as ผู้ขาย
    participant SYS as SafePay
    participant B as ผู้ซื้อ
    participant A as แอดมิน

    Note over S,A: Phase 1: สร้างดีล
    S->>SYS: สร้างดีล (ชื่อ, ราคา, รูป, ขนส่ง)
    SYS->>SYS: สร้าง Deal (DRAFT)
    S->>SYS: กด "เผยแพร่"
    SYS->>SYS: Deal → ACTIVE
    S->>SYS: สร้างลิงก์สั่งซื้อ
    SYS->>SYS: สร้าง Order + Public Token
    SYS-->>S: ลิงก์: safepay.co/orders/abc123

    Note over S,A: Phase 2: ผู้ซื้อชำระเงิน
    S-->>B: ส่งลิงก์ (ผ่าน FB, LINE, etc.)
    B->>SYS: เปิดลิงก์ (ไม่ต้อง login)
    SYS-->>B: แสดงข้อมูลสินค้า + ราคา
    B->>SYS: เข้าสู่ระบบ (Facebook)
    SYS->>SYS: ผูก Buyer กับ Order
    SYS-->>B: แสดงบัญชีรับเงิน SafePay
    B->>B: โอนเงินผ่านธนาคาร
    B->>SYS: อัพโหลดสลิป
    SYS->>SYS: Order → PAYMENT_UPLOADED

    Note over S,A: Phase 3: ตรวจสลิป
    SYS-->>A: แจ้งเตือน: มีสลิปรอตรวจ
    A->>SYS: ตรวจสอบสลิป

    alt สลิปถูกต้อง
        A->>SYS: Approve
        SYS->>SYS: Order → PAYMENT_RECEIVED
        SYS-->>S: แจ้งเตือน: ชำระเงินแล้ว กรุณาจัดส่ง
        SYS-->>B: แจ้งเตือน: ชำระเงินสำเร็จ
    else สลิปไม่ถูกต้อง
        A->>SYS: Reject + เหตุผล
        SYS->>SYS: Order → PENDING_PAYMENT
        SYS-->>B: แจ้งเตือน: สลิปไม่ผ่าน กรุณาส่งใหม่
    end

    Note over S,A: Phase 4: จัดส่ง
    S->>SYS: ใส่ tracking + เลือกขนส่ง
    SYS->>SYS: Order → SHIPPING
    SYS-->>B: แจ้งเตือน: สินค้าถูกจัดส่งแล้ว

    S->>SYS: กดยืนยัน "ส่งถึงแล้ว"
    SYS->>SYS: Order → DELIVERED
    SYS->>SYS: ตั้ง confirmDeadline = NOW + 3 วัน
    SYS-->>B: แจ้งเตือน: สินค้าส่งถึงแล้ว กรุณายืนยันรับ

    Note over S,A: Phase 5: ยืนยันรับ
    alt ผู้ซื้อยืนยัน
        B->>SYS: กดยืนยัน + อัพรูป
        SYS->>SYS: Order → COMPLETED
        SYS-->>S: แจ้งเตือน: ดีลสำเร็จ
        SYS-->>A: แจ้งเตือน: มี payout รอดำเนินการ
        A->>A: โอนเงินให้ผู้ขาย (นอกระบบ)
        A->>SYS: กดยืนยัน payout
        SYS-->>S: แจ้งเตือน: ได้รับเงินแล้ว
    else deadline หมด
        SYS->>SYS: Cron: Order → COMPLETED (auto)
        SYS-->>B: แจ้งเตือน: ยืนยันรับอัตโนมัติ
        SYS-->>S: แจ้งเตือน: ดีลสำเร็จ
    else เปิดข้อพิพาท
        B->>SYS: เปิด Dispute + แนบหลักฐาน
        SYS->>SYS: Order → DISPUTE
        Note over S,A: ดู Dispute Flow
    end
```

---

## 4. Order State Machine

```mermaid
stateDiagram-v2
    [*] --> PENDING_PAYMENT: สร้าง Order

    PENDING_PAYMENT --> PAYMENT_UPLOADED: Buyer อัพโหลดสลิป
    PENDING_PAYMENT --> CANCELLED: ยกเลิก

    PAYMENT_UPLOADED --> PAYMENT_RECEIVED: Admin approve
    PAYMENT_UPLOADED --> PENDING_PAYMENT: Admin reject\n(ส่งสลิปใหม่ได้)
    PAYMENT_UPLOADED --> CANCELLED: Reject ครบ 3 ครั้ง

    PAYMENT_RECEIVED --> SHIPPING: Seller จัดส่ง\n+ tracking

    SHIPPING --> DELIVERED: Seller กดยืนยัน\nส่งถึงแล้ว

    DELIVERED --> COMPLETED: Buyer ยืนยันรับ\nหรือ auto-complete
    DELIVERED --> DISPUTE: Buyer/Seller\nเปิดข้อพิพาท

    DISPUTE --> REFUNDED: Admin ตัดสิน\nคืนผู้ซื้อ
    DISPUTE --> RELEASED: Admin ตัดสิน\nปล่อยผู้ขาย

    COMPLETED --> [*]
    CANCELLED --> [*]
    REFUNDED --> [*]
    RELEASED --> [*]

    note right of PENDING_PAYMENT
        สลิปถูก reject → กลับมาที่นี่
        Buyer ส่งสลิปใหม่ได้ (max 3 ครั้ง)
    end note

    note right of DELIVERED
        confirmDeadline = NOW + N วัน
        Dispute ชนะ auto-complete เสมอ
    end note
```

---

## 5. Deal Lifecycle

```mermaid
stateDiagram-v2
    [*] --> DRAFT: Seller สร้างดีล

    DRAFT --> ACTIVE: Seller กด "เผยแพร่"

    ACTIVE --> CLOSED: Seller กด "ปิดดีล"\n(ไม่มี active orders)

    CLOSED --> [*]

    note right of DRAFT
        แก้ไขได้ทุกอย่าง
        ยังสร้าง order link ไม่ได้
    end note

    note right of ACTIVE
        สร้าง order link ได้
        แก้ไขข้อมูลได้ (ยกเว้นสถานะ)
        1 deal = หลาย orders ได้
    end note
```

---

## 6. Dispute Flow

```mermaid
sequenceDiagram
    participant B as ผู้ซื้อ
    participant SYS as SafePay
    participant S as ผู้ขาย
    participant A as แอดมิน

    Note over B,A: สถานะ Order = DELIVERED

    B->>SYS: เปิด Dispute<br/>เหตุผล + หลักฐาน
    SYS->>SYS: Order → DISPUTE
    SYS->>SYS: สร้าง Dispute (OPEN)
    SYS-->>S: แจ้งเตือน: มีข้อพิพาท
    SYS-->>A: แจ้งเตือน: มี dispute ใหม่

    loop ส่งข้อความ/หลักฐาน
        B->>SYS: ส่งข้อความ + รูป
        SYS-->>S: แจ้งเตือน
        S->>SYS: ตอบกลับ + หลักฐาน
        SYS-->>B: แจ้งเตือน
    end

    A->>SYS: พิจารณาหลักฐาน

    alt ตัดสินให้ผู้ซื้อ
        A->>SYS: Resolve → RESOLVED_BUYER
        SYS->>SYS: Order → REFUNDED
        SYS-->>B: แจ้งเตือน: ชนะ dispute, จะได้รับเงินคืน
        SYS-->>S: แจ้งเตือน: แพ้ dispute
        A->>A: โอนเงินคืนผู้ซื้อ (นอกระบบ)
    else ตัดสินให้ผู้ขาย
        A->>SYS: Resolve → RESOLVED_SELLER
        SYS->>SYS: Order → RELEASED
        SYS-->>S: แจ้งเตือน: ชนะ dispute, จะได้รับเงิน
        SYS-->>B: แจ้งเตือน: แพ้ dispute
        A->>A: โอนเงินให้ผู้ขาย (นอกระบบ)
    end
```

---

## 7. Payment Verification Flow

```mermaid
flowchart TD
    A[Buyer อัพโหลดสลิป] --> B{Idempotency Check}
    B -->|Key ซ้ำ| C[Return ผลเดิม]
    B -->|Key ใหม่| D[บันทึก Payment<br/>Status: PENDING]

    D --> E[Order → PAYMENT_UPLOADED]
    E --> F[แจ้ง Admin]

    F --> G{Admin ตรวจสลิป}

    G -->|Approve| H[Payment → APPROVED]
    H --> I[Order → PAYMENT_RECEIVED]
    I --> J[แจ้ง Seller + Buyer]

    G -->|Reject| K[Payment → REJECTED<br/>+ เหตุผล]
    K --> L{ครบ 3 ครั้ง?}
    L -->|ไม่| M[Order → PENDING_PAYMENT]
    M --> N[แจ้ง Buyer: ส่งสลิปใหม่]
    N --> A

    L -->|ใช่| O[Order → CANCELLED]
    O --> P[แจ้ง Buyer + Seller]

    style A fill:#bbdefb
    style H fill:#c8e6c9
    style K fill:#ffcdd2
    style O fill:#ffcdd2
```

---

## 8. Auto-Complete Cron Flow

```mermaid
flowchart TD
    A[Cron ทุกชั่วโมง] --> B[หา Orders:<br/>status = DELIVERED<br/>confirmDeadline < NOW]

    B --> C{มี OPEN Dispute?}

    C -->|ใช่| D[ข้าม Order นี้<br/>Dispute ชนะเสมอ]

    C -->|ไม่| E[Atomic Update:<br/>WHERE status = DELIVERED]

    E --> F{Update สำเร็จ?}

    F -->|ใช่| G[Order → COMPLETED]
    G --> H[เพิ่ม Points<br/>Buyer + Seller]
    H --> I[สร้าง Notification<br/>ทั้งสองฝ่าย]

    F -->|ไม่| J[ข้าม<br/>Race condition]

    I --> K[บันทึก Log]
    D --> K
    J --> K

    style A fill:#fff9c4
    style G fill:#c8e6c9
    style D fill:#ffecb3
    style J fill:#ffecb3
```

---

## 9. Database ERD (Entity Relationship Diagram)

```mermaid
erDiagram
    users ||--o{ accounts : has
    users ||--o| seller_bank_accounts : has
    users ||--o{ deals : "creates (seller)"
    users ||--o{ orders : "buys (buyer)"
    users ||--o{ disputes : "opens"
    users ||--o{ disputes : "resolves (admin)"
    users ||--o{ dispute_messages : sends
    users ||--o{ notifications : receives
    users ||--o{ point_histories : earns
    users ||--o{ payments : "verifies (admin)"

    deals ||--o{ orders : contains

    orders ||--o{ payments : has
    orders ||--o| shipments : has
    orders ||--o| disputes : has
    orders ||--o{ notifications : references
    orders ||--o{ point_histories : references

    shipments ||--o{ tracking_updates : has

    disputes ||--o{ dispute_messages : has

    users {
        string id PK
        string facebookId UK
        string name
        string email
        string avatar
        enum role "BUYER|SELLER|ADMIN"
        int points
        boolean isActive
    }

    accounts {
        string id PK
        string userId FK
        string provider
        string providerAccountId
    }

    seller_bank_accounts {
        string id PK
        string userId FK_UK
        string bankName
        string accountNo "encrypted"
        string accountName
    }

    deals {
        string id PK
        string sellerId FK
        string productName
        string description
        decimal price
        json images
        string shippingMethod
        enum status "DRAFT|ACTIVE|CLOSED"
    }

    orders {
        string id PK
        string dealId FK
        string buyerId FK
        string publicToken UK
        decimal amount
        enum status "10 statuses"
        string idempotencyKey
        datetime confirmDeadline
        int paymentAttempts
        boolean payoutConfirmed
        datetime completedAt
    }

    payments {
        string id PK
        string orderId FK
        decimal amount
        string slipImage
        enum status "PENDING|APPROVED|REJECTED"
        string idempotencyKey UK
        string verifiedBy FK
        string rejectedReason
    }

    shipments {
        string id PK
        string orderId FK_UK
        string provider
        string trackingNo
        enum status "SHIPPED|IN_TRANSIT|DELIVERED"
        datetime shippedAt
        datetime deliveredAt
    }

    tracking_updates {
        string id PK
        string shipmentId FK
        string status
        string description
    }

    disputes {
        string id PK
        string orderId FK_UK
        string openedBy FK
        string reason
        json evidence
        enum status "OPEN|RESOLVED_BUYER|RESOLVED_SELLER"
        string resolution
        string resolvedBy FK
    }

    dispute_messages {
        string id PK
        string disputeId FK
        string senderId FK
        string message
        json attachments
    }

    notifications {
        string id PK
        string userId FK
        string type
        string title
        string message
        string relatedOrderId FK
        boolean isRead
    }

    point_histories {
        string id PK
        string userId FK
        string orderId FK
        int amount
        string type
    }

    system_settings {
        string id PK
        string key UK
        string value
    }
```

---

## 10. Page Layout Wireframes

### 10.1 Order Link (Mobile)

```mermaid
block-beta
    columns 1
    block:header
        A["🛡️ SafePay"]
    end
    block:product
        B["สินค้า: iPhone 15 Pro"]
        C["ราคา: ฿35,000"]
        D["ผู้ขาย: somchai ⭐ 45 pts"]
        E["ส่งโดย: Kerry Express"]
    end
    block:payment
        F["โอนเงินไปที่:"]
        G["ธ.กสิกร 012-345-6789"]
        H["ชื่อ บจก. เซฟเพย์"]
    end
    block:action
        I["📷 อัพโหลดสลิป"]
    end
    block:timeline
        J["● สร้างออเดอร์ 10:00"]
        K["● รอชำระเงิน"]
        L["○ ตรวจสอบสลิป"]
        M["○ จัดส่ง"]
        N["○ ยืนยันรับ"]
    end
```

### 10.2 Customer Dashboard Layout

```mermaid
block-beta
    columns 5

    block:sidebar:1
        S1["แดชบอร์ด"]
        S2["ดีลของฉัน"]
        S3["ออเดอร์"]
        S4["ข้อพิพาท"]
        S5["แจ้งเตือน"]
        S6["โปรไฟล์"]
    end

    block:main:4
        block:topbar
            T1["สวัสดี, สมชาย"]
            T2["🔔 3"]
        end
        block:stats
            C1["Deals: 12"]
            C2["Orders: 8"]
            C3["Points: 45"]
        end
        block:recent
            R1["ออเดอร์ล่าสุด"]
            R2["#ORD-001 iPhone 15 ฿25k 🟡 จัดส่ง"]
            R3["#ORD-002 AirPods ฿5k ✅ สำเร็จ"]
        end
    end
```

### 10.3 Admin Dashboard Layout

```mermaid
block-beta
    columns 5

    block:sidebar:1
        S1["แดชบอร์ด"]
        S2["ผู้ใช้"]
        S3["ดีล"]
        S4["ตรวจสลิป"]
        S5["ข้อพิพาท"]
        S6["Payouts"]
        S7["ตั้งค่า"]
    end

    block:main:4
        block:stats
            C1["Deals: 156"]
            C2["GMV: ฿1.2M"]
            C3["Success: 94%"]
        end
        block:pending
            P1["สลิปรอตรวจ (3)"]
            P2["ORD-042 ฿5,000 [ตรวจ]"]
            P3["ORD-043 ฿12,000 [ตรวจ]"]
        end
        block:disputes
            D1["Disputes เปิดอยู่ (1)"]
            D2["ORD-038 สินค้าเสียหาย [ตัดสิน]"]
        end
    end
```

---

## 11. User Journey Map

```mermaid
journey
    title Buyer Journey - ซื้อสินค้าผ่าน SafePay
    section ค้นพบ
        ได้รับลิงก์จากผู้ขาย: 5: ผู้ซื้อ
        เปิดลิงก์ดูสินค้า: 4: ผู้ซื้อ
    section สมัครสมาชิก
        กดเข้าสู่ระบบ: 3: ผู้ซื้อ
        Login ด้วย Facebook: 4: ผู้ซื้อ
    section ชำระเงิน
        เห็นบัญชีรับเงิน: 4: ผู้ซื้อ
        โอนเงินผ่าน Mobile Banking: 3: ผู้ซื้อ
        อัพโหลดสลิป: 4: ผู้ซื้อ
    section รอตรวจสอบ
        รอ admin ตรวจสลิป: 2: ผู้ซื้อ
        ได้รับแจ้งเตือน: อนุมัติแล้ว: 5: ผู้ซื้อ
    section รอรับสินค้า
        ดู tracking: 3: ผู้ซื้อ
        ได้รับสินค้า: 5: ผู้ซื้อ
    section ยืนยันรับ
        กดยืนยัน + ถ่ายรูป: 4: ผู้ซื้อ
        ดีลสำเร็จ ได้ points: 5: ผู้ซื้อ
```

---

## 12. Deployment Architecture

```mermaid
graph TB
    subgraph Docker["Docker Compose"]
        subgraph App["app (Next.js)"]
            NX[Next.js Server]
            CR[node-cron]
        end

        subgraph DB["db (PostgreSQL)"]
            PG[(PostgreSQL 16)]
        end

        subgraph Migrate["migrate (profile)"]
            PM[prisma migrate deploy]
        end

        subgraph Seed["seed (profile)"]
            PS[prisma db seed]
        end
    end

    subgraph Volumes
        V1[pgdata volume]
        V2[uploads volume]
    end

    NX --> PG
    CR --> PG
    PM --> PG
    PS --> PG
    PG --> V1
    NX --> V2

    USER[ผู้ใช้] -->|:3000| NX

    style Docker fill:#e3f2fd
    style App fill:#fff3e0
    style DB fill:#e8f5e9
```

---

## 13. Security Architecture

```mermaid
flowchart TD
    subgraph Client
        BR[Browser]
    end

    subgraph Edge["Security Layers"]
        RL[Rate Limiter<br/>100/min public<br/>5/min auth]
        MW[Middleware<br/>Auth + Role Check]
    end

    subgraph API["API Routes"]
        ZOD[Zod Validation]
        SVC[Service Layer]
    end

    subgraph Data["Data Protection"]
        AC[Atomic Conditional Update<br/>Race condition prevention]
        ID[Idempotency Check<br/>Double payment prevention]
        FS[File Security<br/>Auth-gated serving]
    end

    subgraph Storage
        DB[(PostgreSQL<br/>ACID Transactions)]
        UL[/uploads/<br/>Outside public/]
    end

    BR -->|httpOnly JWT cookie| RL
    RL --> MW
    MW -->|Role: BUYER/SELLER/ADMIN| ZOD
    ZOD -->|Validated input| SVC
    SVC --> AC
    SVC --> ID
    SVC --> FS
    AC --> DB
    ID --> DB
    FS --> UL

    style Edge fill:#ffebee
    style Data fill:#fff3e0
    style Storage fill:#e8f5e9
```

---

## 14. Notification Events

```mermaid
flowchart LR
    subgraph Events["State Change Events"]
        E1[Payment Approved]
        E2[Payment Rejected]
        E3[Order Shipped]
        E4[Order Delivered]
        E5[Order Completed]
        E6[Auto-Completed]
        E7[Dispute Opened]
        E8[Dispute Message]
        E9[Dispute Resolved]
        E10[Payout Confirmed]
    end

    subgraph Recipients["ผู้รับแจ้งเตือน"]
        B[Buyer]
        S[Seller]
        A[Admin]
    end

    E1 --> B
    E1 --> S
    E2 --> B
    E3 --> B
    E4 --> B
    E5 --> S
    E5 --> A
    E6 --> B
    E6 --> S
    E7 --> S
    E7 --> A
    E8 --> B
    E8 --> S
    E9 --> B
    E9 --> S
    E10 --> S

    style Events fill:#e3f2fd
    style Recipients fill:#e8f5e9
```
