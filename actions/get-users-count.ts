"use server";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { sql } from "drizzle-orm"; // Use sql for count

export async function getUsersCount(): Promise<number | null> {
  try {
    const result = await db.select({ count: sql<number>`count(*)` }).from(user);

    return Number(result[0].count);
  } catch (error) {
    console.error("Error checking users count:", error);
    return null;
  }
}
