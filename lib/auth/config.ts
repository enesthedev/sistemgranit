/**
 * Better Auth configuration
 * Centralized auth configuration that works with Drizzle ORM and Postgres
 *
 * This module exports the auth instance and related types for use across
 * server-side and client-side authentication operations.
 */

import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

/**
 * Better Auth configuration instance
 * Configured to use:
 * - Postgres database via Drizzle ORM
 * - Email and password authentication
 * - Session-based authentication
 */
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
});

/**
 * Inferred types from Better Auth configuration
 * These types ensure type safety when working with auth sessions and users
 */
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
