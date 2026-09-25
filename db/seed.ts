import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./index";
import { portfolios, designInquiries } from "./schema";
import { dummyPortfolios, dummyInquiries } from "../lib/data-dummy";

async function main() {
  console.log("Seeding database on Supabase...");

  try {
    for (const item of dummyPortfolios) {
      await db.insert(portfolios).values({
        title: item.title,
        slug: item.slug,
        category: item.category,
        style: item.style,
        softwareUsed: item.software_used,
        images: item.images,
        description: item.description,
        isFeatured: item.is_featured,
      }).onConflictDoNothing();
    }

    for (const item of dummyInquiries) {
      await db.insert(designInquiries).values({
        clientName: item.client_name,
        clientWhatsapp: item.client_whatsapp,
        furnitureType: item.furniture_type,
        deliverablesNeeded: item.deliverables_needed,
        notesConcept: item.notes_concept,
        agreedFee: item.agreed_fee ? String(item.agreed_fee) : null,
        status: item.status as "in_discussion" | "deal" | "lead_in" | "in_design" | "revision" | "completed",
      }).onConflictDoNothing();
    }

    console.log("🎉 SEEDING BERHASIL! Data dummy sudah masuk ke Supabase!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

main();
