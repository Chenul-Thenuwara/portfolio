# Enterprise Asset Management & IT Service Portal

An advanced, multi-tenant enterprise system designed for resource allocation, hardware/software asset compliance, IT service desk ticketing, digital asset handovers, IT billing oversight, and regional operations management across **Anunine Group Subsidiaries**. Built on Next.js 16 (App Router), Firebase (Auth, Firestore, Storage), Tailwind CSS v4, Framer Motion, and Google Chat / SMTP Automation.

---

## Enterprise Multi-Tenancy

The platform provides centralized management while supporting multi-tenant isolation across **10 Anunine Group Subsidiaries**:

| SBU Code | Subsidiary Name | SBU Code | Subsidiary Name |
| :--- | :--- | :--- | :--- |
| **ANUN** | Anunine Holdings | **KACC** | KSPA Flexible Packaging |
| **ATLK** | ATLK Sri Lanka | **EPML** | Ex-Pack Corrugated Cartons |
| **ATUK** | ATUK United Kingdom | **KSPA** | KSPA Paper |
| **ATUS** | ATUS United States | **EAGL** | Eagle Paper |
| **EPPL** | Ex-Pack Polymers | **RECY** | Anunine Recycling |

---

## Key Features by Portal Subsystem

The platform integrates five distinct role-based portals connected via a centralized Firestore data architecture:

### 1. Employee Portal (`/employee`)
* **Asset Requisitions:** Standardized catalog forms to submit requests for hardware, software, or peripherals with priority levels and business justifications.
* **IT Service Desk:** Support ticketing system with automated SLA target calculation, priority routing (Incident, Service Request, Change Request), and post-resolution feedback/ratings (`TicketFeedback`).
* **Department Task Board:** Dynamic Kanban task boards facilitating real-time collaboration between department employees and their respective Head of Department (HOD).
* **Employee Profile & Security (`/employee/profile`):** Personal information management, profile avatar uploads, password reset workflows, and account settings.

### 2. HR Portal (`/hr`)
* **Workforce Registry & Directory:** Centralized employee directory tracking active headcount, department distributions, and regional SBU registries.
* **Asset Compliance Guard:** Enforces strict asset requisition approval rules (restricting final approvals to HR HODs, SBU Admins, and Super Admins).
* **Employee Lifecycle Management:** Onboarding wizard and account provisioning (`onboard-user.ts`) with automated role assignment and custom claims resolution.

### 3. IT Engineering Portal (`/it`)
* **Service Desk Queue:** Real-time service ticket management with SLA status badges, category sorting, ticket assignment, and resolution logging.
* **Asset Provisioning & Fulfillment Queue:** Restricted workflow interface for hardware and software provisioning executed exclusively by authorized IT Personnel, SBU Admins, or Super Admins.
* **Digital Asset Handover Forms (`/it/handover-form/[id]`):** Automated generation of digital asset physical handover documentation featuring hardware verification checklists, employee signature verification, and printable PDF/sign-off output.
* **Hardware & IT Inventory Registry:**
  * Comprehensive device tracking across 25 standardized asset types (*Laptop*, *Desktop/PC*, *Printer*, *Smart TV*, *UPS*, *Network Switch*, *Access Point*, *CCTV Camera*, *DVR*, *NVR*, *Cables*, *Tools*, etc.).
  * Multi-target allocation workflows supporting both individual employee assignments and direct SBU Department allocations (e.g. IT, HR, Finance) which are automatically excluded from individual handover forms.
  * **CSV Data Export:** One-click exporting of complete or filtered inventory records into formatted CSV spreadsheets.
  * **Batch CSV Data Import:** Streamlined CSV import wizard with downloadable sample CSV templates, header mapping, validation, and automated registration of imported assets as Available.
* **IT Billing & Vendor Compliance Subsystem:**
  * **Summary KPI Dashboard:** Financial KPI cards calculating *Total Pending Invoices*, *Overdue Invoices*, and *Due Today* with dynamic currency formatting (LKR).
  * **SBU & Monthly Filters:** Filter metrics dynamically by SBU or view overall group totals, with due-month filtering (e.g. *Due: July 2026*) and multi-criteria sorting (Due Date, Invoice Date, Amount).
  * **Interactive Modals:** Invoice upload modal with payment slip attachment, payment status update modal (`Mark Paid`), and SBU/Vendor email directory management.
  * **Omnichannel Notifications & Google Chat Webhooks:**
    * **Google Chat Webhook Cards:** Dispatches rich card alerts for new invoice uploads, 3-day overdue escalations, and weekly digests (`GOOGLE_CHAT_WEBHOOK_URL`).
    * **Daily SMTP Reminders (8:00 AM SLST):** Sends payment reminders and overdue escalations to SBU Finance contact emails via Gmail SMTP (`itadmin@anunine.com`).
    * **Weekly Friday Digest (11:00 AM SLST):** Automated Vercel Cron job generating a CSV spreadsheet attachment of all pending invoices sent to IT Personnel emails.
  * **Manual Mail Trigger:** On-demand email dispatch button to send instant reminders to Finance and Vendor contacts.

### 4. Strategic Business Unit (SBU) Portal (`/sbu`)
* **Regional Oversight:** Regional Instance Admins (SBU Admins) manage local personnel registries, asset distributions, and department permissions.
* **SBU Executive Task Board:** Dedicated SBU-wide Kanban board enabling the SBU Head to assign, track, and collaborate on tasks with regional HODs.
* **Offboarding Asset Recovery Tracker:** Retrieval tracking and audit workflows to ensure company hardware/software assets are returned during employee offboarding.

### 5. Super Admin Global Portal (`/admin`)
* **Global Visibility:** Master administrative dashboard providing cross-SBU oversight of all employee registries, hardware catalogs, and billing queues.
* **Multi-Tenant Context Switcher:** Dynamic SBU context switcher enabling Super Admins to seamlessly pivot between different SBU instances (ANUN, ATLK, ATUK, EPPL, etc.).
* **Custom Claims & Role Governance:** User administration panel (`manage-users.ts`) and maintenance scripts to assign custom Firebase Auth claims (`isSuperAdmin`, `isSbuAdmin`, `isHod`, `isItPersonnel`).

---

## Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | **Next.js 16** (Turbopack, App Router, **React 19**) |
| **Language & Type System** | **TypeScript 5** |
| **Styling & Motion** | **Tailwind CSS v4**, Vanilla CSS tokens, **Framer Motion 12**, Emotion, **Material UI Icons** |
| **Backend & Database** | **Firebase Client SDK (v12)** & **Firebase Admin SDK (v13)** using the named Firestore database instance `anunine-sd` |
| **Email Dispatcher** | **Nodemailer (v9)** via Gmail SMTP (`itadmin@anunine.com`) |
| **Chat Automation** | **Google Chat Webhooks** (Interactive JSON Card Payload API) |
| **Cron & Scheduling** | **Vercel Cron** configured for Sri Lanka Standard Time (Asia/Colombo / UTC+5:30) |
| **Testing Suite** | **Vitest 4**, React Testing Library, JSDOM |

---

## Project Directory Structure

```text
├── app/
│   ├── (auth)/                  # Auth layout & login route
│   ├── actions/                 # Server Actions (billing, user mgmt, onboarding, emails)
│   │   ├── billing-actions.ts   # Invoice uploads, status changes, email reminders
│   │   ├── create-super-admin.ts# Promote user to super admin
│   │   ├── manage-users.ts      # User CRUD, role assignments, custom claims
│   │   ├── onboard-user.ts      # Employee onboarding & account creation
│   │   ├── send-approval-email.ts# Approval workflow email notifications
│   │   ├── send-task-email.ts   # Kanban task notification emails
│   │   └── update-profile.ts    # User profile updates
│   ├── admin/                   # Super Admin global dashboard & user management
│   ├── api/cron/                # Vercel Cron API endpoints
│   │   ├── billing-reminders/   # Daily due-date & overdue escalation cron handler
│   │   └── weekly-digest/       # Friday weekly CSV digest cron handler
│   ├── employee/[[...tab]]/     # Employee portal tabs (Asset reqs, Tickets, Task Board)
│   ├── hr/[[...view]]/          # HR portal views (Directory, Compliance, Onboarding)
│   ├── it/                      # IT Engineering portal routes
│   │   ├── [[...view]]/         # Tickets, Fulfillment queue, Billing, Inventory
│   │   └── handover-form/[id]/  # Printable Digital Asset Handover Form
│   ├── sbu/[[...view]]/         # SBU portal views (Regional oversight, SBU Task Board)
│   ├── globals.css              # Global styles & Tailwind CSS v4 setup
│   └── layout.tsx               # Root layout & context providers
├── components/
│   ├── it/                      # IT Subsystem UI Components
│   │   ├── billing-monitoring-view.tsx # IT Billing dashboard & filter toolbar
│   │   ├── upload-invoice-modal.tsx    # Upload new invoice modal
│   │   ├── mark-paid-modal.tsx         # Mark invoice paid & payment slip upload modal
│   │   └── vendor-sbu-modal.tsx        # SBU contacts & vendor directory modal
│   ├── CustomSelect.tsx         # Reusable custom select input dropdown
│   ├── ProfileView.tsx          # Employee profile & security management view
│   ├── TicketFeedback.tsx       # Support ticket rating & feedback modal
│   ├── department-task-board.tsx# Shared dynamic Kanban board (HOD & SBU scopes)
│   ├── hod-dashboard.tsx        # HOD dashboard & approval queues
│   └── route-guard.tsx          # Client-side RBAC route protection component
├── context/
│   └── auth-context.tsx         # Firebase Auth provider & custom claims state
├── lib/
│   ├── types/
│   │   └── billing.ts           # Billing, Invoice, Vendor, & SBU TypeScript interfaces
│   ├── billing-utils.ts         # Aging calculations, metric aggregations, CSV exporter
│   ├── branding-utils.ts        # Group SBU branding colors & metadata helpers
│   ├── firebase.ts              # Firebase Client SDK initializer (db: 'anunine-sd')
│   ├── firebase-admin.ts        # Firebase Admin SDK initializer
│   ├── google-chat.ts           # Google Chat Webhook card generator & sender
│   └── sla-utils.ts             # Service Desk SLA target & elapsed time calculators
├── scripts/                     # Maintenance & administrative scripts
│   ├── create-superadmin.js     # CLI script to grant super admin access
│   ├── set-custom-claims.mjs    # Set custom claims on Firebase Auth users
│   ├── seed-users.js            # Initial user database seeding script
│   └── repair-key.js            # Service account JSON formatting helper
├── vercel.json                  # Vercel Cron schedule configurations
├── vitest.config.ts             # Vitest test runner configuration
├── tsconfig.json                # TypeScript compiler configuration
└── package.json                 # Core dependencies and NPM scripts
```

---

## Firestore Collections Schema

The system connects to the named Firestore database instance **`anunine-sd`** using the following schema:

| Collection | Primary Purpose | Key Fields |
| :--- | :--- | :--- |
| `employees` | Staff registry & RBAC profile | `email`, `role`, `department`, `sbu`, `isHod`, `reportingHod`, `createdAt` |
| `asset_requests` | Hardware/Software requisitions | `assetClass`, `employeeEmail`, `sbuStatus`, `currentStage`, `priority`, `items` |
| `tickets` | Support desk tickets | `submittedBy`, `title`, `priority`, `category`, `status`, `slaTarget`, `feedback` |
| `invoices` | IT vendor invoice billing queue | `invoiceNumber`, `sbuId`, `vendorId`, `amount`, `currency`, `dueDate`, `status`, `slipUrl`, `lastRemindedAt`, `lastEscalatedAt` |
| `inventory` | Hardware & IT asset records | `assetTag`, `makeModel`, `type`, `serialNumber`, `status`, `assignedTo`, `assignedToDepartment`, `sbu`, `notes`, `history` |
| `sbus` | Subsidiary metadata & email routing | `sbuId`, `name`, `financeEmails`, `itEmails` |
| `vendors` | Vendor catalog & credit terms | `vendorId`, `name`, `agreedTerms`, `contactEmails`, `notes` |
| `tasks` | Department & SBU Kanban cards | `title`, `description`, `assigneeEmails`, `department`, `columnId`, `priority`, `order` |
| `hod_kanban_columns`| Dynamic Kanban column layouts | `name`, `order`, `sbu`, `department` (e.g., `"HOD"` or `"SBU"`) |
| `hod_custom_fields` | Custom metadata fields for cards | `name`, `type`, `sbu`, `department` |

---

## Environment Configuration

Create a `.env.local` file in the project root directory and configure the required environment variables:

```env
# Firebase Client SDK Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=anunine-support-desk.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://anunine-support-desk.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=anunine-support-desk
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=anunine-support-desk.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK Credentials
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@anunine-support-desk.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"

# SMTP Mail Dispatcher Settings (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=itadmin@anunine.com
SMTP_PASS=your_app_password

# Google Chat Webhook Integration (Optional)
GOOGLE_CHAT_WEBHOOK_URL=https://chat.googleapis.com/v1/spaces/XXXXX/messages?key=YYYYY

# Vercel Cron Endpoint Protection Secret
CRON_SECRET=your_cron_secret_token
```

---

## Getting Started

### 1. Installation
Clone the repository and install project dependencies:
```bash
git clone https://github.com/Chenul-Thenuwara/Enterprise-Asset-Management-IT-Service-Portal.git
cd Enterprise-Asset-Management-IT-Service-Portal
npm install
```

### 2. Run Development Server
Start the Next.js local development server with Turbopack:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Verification & Testing

The project maintains high code quality standards backed by automated unit tests and strict type checking:

### Run Unit Tests
Execute the Vitest test runner across all test suites (`*.test.ts`, `*.test.tsx`):
```bash
npm run test
```

### Type-Checking
Validate TypeScript types across the entire codebase without emitting build output:
```bash
npx tsc --noEmit
```

### ESLint Linting
Verify code linting and formatting compliance:
```bash
npm run lint
```

### Production Build Verification
Test compiling the production Next.js bundle:
```bash
npm run build
```

---

## Administrative CLI Scripts

The project includes utility scripts in the `scripts/` directory for system maintenance:

* **Promote User to Super Admin:**
  ```bash
  node scripts/create-superadmin.js admin@anunine.com
  ```
* **Set Custom Firebase Auth Claims:**
  ```bash
  node scripts/set-custom-claims.mjs
  ```
* **Seed Initial Database Users:**
  ```bash
  node scripts/seed-users.js
  ```

---

## Cron Automation Schedules (`vercel.json`)

Automated background jobs are scheduled via Vercel Cron:

| Route Path | Schedule | Timezone | Trigger Description |
| :--- | :--- | :--- | :--- |
| `/api/cron/billing-reminders` | `30 2 * * *` (02:30 UTC) | **8:00 AM SLST** | Checks pending invoices, sends Day-0 due reminders, dispatches 3-day overdue escalations, and fires Friday 11:00 AM weekly CSV digest. |

---

## License & Attribution

Internal Enterprise System developed for **Anunine Holdings & Subsidiary Companies**. Author: **Chenul Dulmika Thenuwara**. Unauthorized reproduction or distribution is strictly prohibited.
