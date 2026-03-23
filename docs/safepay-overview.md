# SafePay — ภาพรวมระบบ

## ผู้เกี่ยวข้องในระบบ

```mermaid
graph TB
    subgraph customers ["ลูกค้าของเรา"]
        BUYER["🛒 ผู้ซื้อ<br/>(Buyer)<br/>คนที่อยากซื้อของออนไลน์<br/>แต่กลัวโดนโกง"]
        SELLER["🏪 ผู้ขาย<br/>(Seller)<br/>คนที่อยากขายของออนไลน์<br/>แต่ลูกค้าไม่กล้าโอน"]
    end

    subgraph safepay ["SafePay - คือเรา"]
        SP["🛡️ SafePay<br/>(ตัวกลางพักเงิน)<br/>รับเงินจากผู้ซื้อ<br/>พักไว้จนกว่าจะได้ของ"]
        ADMIN["👨‍💼 แอดมิน<br/>ตรวจสลิป · แก้ปัญหา"]
    end

    SELLER -- "1. สร้างลิงก์ขายของ<br/>ส่งให้ผู้ซื้อ" --> SP
    BUYER -- "2. โอนเงินให้ SafePay<br/>(ไม่ใช่ให้ผู้ขาย)" --> SP
    SP -- "3. แจ้งผู้ขายว่าได้เงินแล้ว<br/>ให้ส่งของได้เลย" --> SELLER
    SELLER -- "4. ส่งของ + แจ้งเลขพัสดุ" --> BUYER
    BUYER -- "5. ได้ของแล้ว กดยืนยัน" --> SP
    SP -- "6. ปล่อยเงินให้ผู้ขาย 💰" --> SELLER

    style BUYER fill:#dbeafe,stroke:#2563eb,color:#1e3a5f
    style SELLER fill:#dcfce7,stroke:#16a34a,color:#14532d
    style SP fill:#fef3c7,stroke:#d97706,color:#78350f
    style ADMIN fill:#fef3c7,stroke:#d97706,color:#78350f
```

## ทำไมต้องมี SafePay?

```mermaid
graph LR
    subgraph without ["ไม่มี SafePay"]
        B1["ผู้ซื้อ"] -- "โอนเงินตรง 💸" --> S1["ผู้ขาย"]
        S1 -. "ไม่ส่งของ? 😱" .-> B1
    end

    subgraph with_sp ["มี SafePay"]
        B2["ผู้ซื้อ"] -- "โอนเงิน" --> SP2["🛡️ SafePay<br/>ล็อคเงินไว้"]
        SP2 -- "ได้ของแล้ว<br/>→ ปล่อยเงิน" --> S2["ผู้ขาย"]
    end

    style B1 fill:#fee2e2,stroke:#dc2626
    style S1 fill:#fee2e2,stroke:#dc2626
    style B2 fill:#dbeafe,stroke:#2563eb
    style S2 fill:#dcfce7,stroke:#16a34a
    style SP2 fill:#fef3c7,stroke:#d97706
```

## ขั้นตอนการทำงาน (Escrow Flow)

```mermaid
sequenceDiagram
    participant ผู้ขาย
    participant SafePay
    participant ผู้ซื้อ
    participant แอดมิน

    ผู้ขาย->>SafePay: สร้างดีล (ชื่อสินค้า + ราคา)
    SafePay-->>ผู้ขาย: ลิงก์สำหรับส่งให้ผู้ซื้อ
    ผู้ขาย->>ผู้ซื้อ: ส่งลิงก์ SafePay

    ผู้ซื้อ->>SafePay: เปิดลิงก์ ดูรายละเอียด
    ผู้ซื้อ->>SafePay: โอนเงิน + อัปโหลดสลิป

    SafePay->>แอดมิน: มีสลิปรอตรวจ
    แอดมิน->>SafePay: ✅ ยืนยันการชำระเงิน

    SafePay->>ผู้ขาย: 💰 เงินเข้าแล้ว ส่งของได้เลย!
    ผู้ขาย->>SafePay: แจ้งเลขพัสดุ
    SafePay->>ผู้ซื้อ: 📦 ของกำลังส่ง (เลขพัสดุ: xxx)

    ผู้ซื้อ->>SafePay: ได้ของแล้ว ✅ ยืนยัน
    SafePay->>ผู้ขาย: 💸 โอนเงินให้ผู้ขาย

    Note over ผู้ซื้อ,แอดมิน: ถ้าได้ของไม่ตรง → เปิดข้อพิพาท → แอดมินตัดสิน
```

## เมื่อเกิดปัญหา (ระบบข้อพิพาท)

```mermaid
graph TD
    A["📦 ผู้ซื้อได้ของแล้ว"] --> B{"ของตรงตามที่สั่ง?"}

    B -- "✅ ใช่" --> C["กดยืนยัน → เงินไปผู้ขาย 💸"]
    B -- "❌ ไม่ใช่" --> D["เปิดข้อพิพาท 🚨"]

    D --> E["แอดมินตรวจสอบ<br/>หลักฐานทั้งสองฝ่าย"]

    E --> F{"แอดมินตัดสิน"}
    F -- "ผู้ซื้อถูก" --> G["คืนเงินให้ผู้ซื้อ 💰"]
    F -- "ผู้ขายถูก" --> H["ปล่อยเงินให้ผู้ขาย 💸"]

    style A fill:#dbeafe,stroke:#2563eb
    style C fill:#dcfce7,stroke:#16a34a
    style D fill:#fee2e2,stroke:#dc2626
    style G fill:#dbeafe,stroke:#2563eb
    style H fill:#dcfce7,stroke:#16a34a
```

## รายได้ของ SafePay

```mermaid
graph LR
    R["💡 โมเดลรายได้ในอนาคต"] --> R1["ค่าธรรมเนียมต่อธุรกรรม<br/>(ปัจจุบัน: ฟรี 0฿)"]
    R --> R2["ค่าสมาชิก Premium<br/>สำหรับผู้ขาย"]
    R --> R3["ค่าโฆษณา/โปรโมท<br/>ดีลของผู้ขาย"]

    style R fill:#f3e8ff,stroke:#7c3aed
    style R1 fill:#fef3c7,stroke:#d97706
    style R2 fill:#fef3c7,stroke:#d97706
    style R3 fill:#fef3c7,stroke:#d97706
```
