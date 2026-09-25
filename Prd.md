# SYSTEM PROMPT: FULLSTACK WEB APPLICATION PRD

## 1. PROJECT OVERVIEW
- Project Name: Jepara 3D Furniture Design Studio
- Category: Professional 3D Furniture & Interior Design Services (Design Only, Non-Manufacturing)
- Target Audience: Homeowners, cafe/restaurant/villa owners, contractors, and furniture workshops needing 3D renders, working drawings (blueprints), and material moodboards.
- Primary Deal Mechanism: Portfolio showcase -> Custom Design Brief Form -> Structured Direct WhatsApp Consultation & Fee Negotiation -> Admin Leads Tracking.

## 2. KEY FEATURES
### A. Client-Facing
- Showcase Portfolio: Filterable gallery (Living, Dining, Bedroom, Commercial/Cafe, Custom Piece) with 3D renders, software used (SketchUp, Blender, Enscape), design styles (Japandi, Modern, Industrial, Ukir Jepara Modern), and sample technical drawings.
- Service Packages: 3D Visualization, 2D Working Drawings (cutting/carpentry blueprints), and Material/Finishing Recommendations.
- Custom Brief & WhatsApp Generator:
  - Form fields: Client Name, WhatsApp Number, Furniture Type, Dimensions, Deliverables Needed (Render Only vs Render + Working Drawing), Style/Concept, and Specific Notes.
  - Action: Saves brief as a new lead in the database and triggers direct redirect to WhatsApp with a structured, pre-filled quotation inquiry message for custom fee negotiation.
- Design Process Timeline: Transparent 4-step workflow (Brief & Nego -> 3D Modeling -> Review/Revisions -> Final Delivery of Render & PDF Blueprints).

### B. Admin Dashboard (Designer Portal)
- Authentication: Secure login for the designer.
- Portfolio Management (CRUD): Create, update, delete projects with multi-image URLs and metadata tags.
- Inquiries & Negotiation CRM: List incoming design briefs, filter by status ('lead_in', 'in_discussion', 'deal', 'in_design', 'revision', 'completed'), and log agreed project fees after WhatsApp closing.

## 3. TECH STACK & ARCHITECTURE
- Framework: Next.js (App Router) with TypeScript
- Styling & UI: Tailwind CSS + shadcn/ui (Clean, warm-minimalist aesthetic tailored for wood & interior design)
- Database: PostgreSQL (via Supabase or Neon)
- ORM: Drizzle ORM
- Authentication: Better Auth / NextAuth
- Storage: Cloudinary / Supabase Storage (High-res 3D render images)
- Deployment Target: Vercel + GitHub CI/CD

## 4. DATABASE SCHEMA (DRIZZLE ORM SPEC)
- Table: `portfolios`
  - `id`: UUID (PK, default random)
  - `title`: text (not null)
  - `slug`: text (unique, not null)
  - `category`: text (not null)
  - `style`: text (not null)
  - `software_used`: text (not null)
  - `images`: jsonb (array of image URLs)
  - `description`: text
  - `is_featured`: boolean (default false)
  - `created_at`: timestamp (default now)

- Table: `design_inquiries`
  - `id`: UUID (PK, default random)
  - `client_name`: text (not null)
  - `client_whatsapp`: text (not null)
  - `furniture_type`: text (not null)
  - `deliverables_needed`: text (not null)
  - `notes_concept`: text
  - `agreed_fee`: numeric (nullable, updated after WA deal)
  - `status`: text (enum: 'lead_in', 'in_discussion', 'deal', 'in_design', 'revision', 'completed', default 'lead_in')
  - `created_at`: timestamp (default now)

- Table: `users`
  - `id`: UUID (PK, default random)
  - `email`: text (unique, not null)
  - `password_hash`: text (not null)
  - `name`: text (not null)
  - `created_at`: timestamp (default now)

## 5. WHATSAPP MESSAGE TEMPLATE SPECIFICATION
Target Phone Number: [INSERT_DESIGNER_WA_NUMBER]
Payload format:
"Halo Kak, saya mau konsultasi jasa desain furniture dari website:
• Nama: {{client_name}}
• Item Furniture: {{furniture_type}}
• Output yang Dibutuhkan: {{deliverables_needed}}
• Catatan/Konsep: {{notes_concept}}

Kira-kira untuk estimasi biaya jasa desain dan jadwal pengerjaannya bagaimana ya kak? Terima kasih!"

## 6. IMPLEMENTATION ROADMAP
1. Frontend Setup: Responsive landing page, portfolio gallery modal/detail, custom brief generator form, and admin layout.
2. Backend & DB: Drizzle schema, Supabase connection, API route handlers for `/api/portfolios` and `/api/inquiries`.
3. Integration: Server actions/fetch hooks, WhatsApp URI encoder handler, and admin status updates.
4. Deployment & E2E Verification.