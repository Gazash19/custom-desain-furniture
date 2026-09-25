import { pgTable, text, timestamp, boolean, numeric, uuid, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const portfolios = pgTable("portfolios", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  category: text("category").notNull(),
  style: text("style").notNull(),
  softwareUsed: text("software_used").notNull(),
  images: jsonb("images").$type<string[]>(),
  description: text("description"),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const designInquiries = pgTable("design_inquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientName: text("client_name").notNull(),
  clientWhatsapp: text("client_whatsapp").notNull(),
  furnitureType: text("furniture_type").notNull(),
  deliverablesNeeded: text("deliverables_needed").notNull(),
  notesConcept: text("notes_concept"),
  agreedFee: numeric("agreed_fee"),
  status: text("status").$type<'lead_in' | 'in_discussion' | 'deal' | 'in_design' | 'revision' | 'completed'>().default('lead_in'),
  createdAt: timestamp("created_at").defaultNow(),
});
