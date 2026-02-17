import {
  pgTable,
  uuid,
  text,
  numeric,
  boolean,
  timestamp,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

// Enums
export const statusEnum = pgEnum("status", ["active", "draft", "archived"]);

import { relations } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

// Categories
export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Products
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  categoryId: uuid("category_id").references(() => categories.id),
  status: statusEnum("status").default("draft").notNull(),
  pricePerSqm: numeric("price_per_sqm"),
  currency: text("currency").default("TRY"),
  thumbnail: text("thumbnail"),
  images: text("images").array(),
  originCountry: text("origin_country"),
  originRegion: text("origin_region"),
  colorPrimary: text("color_primary"),
  colorSecondary: text("color_secondary"),
  pattern: text("pattern"), // keeping as text for flexibility
  finishTypes: text("finish_types").array(), // array of strings
  density: numeric("density"),
  waterAbsorption: numeric("water_absorption"),
  compressiveStrength: numeric("compressive_strength"),
  flexuralStrength: numeric("flexural_strength"),
  abrasionResistance: text("abrasion_resistance"),
  hardnessMohs: numeric("hardness_mohs"),
  frostResistant: boolean("frost_resistant").default(false).notNull(),
  availableThicknesses: numeric("available_thicknesses").array(),
  maxSlabWidth: numeric("max_slab_width"),
  maxSlabLength: numeric("max_slab_length"),
  minOrderQuantity: numeric("min_order_quantity").default("1").notNull(),
  applications: text("applications").array(),
  isSuitableForExterior: boolean("is_suitable_for_exterior")
    .default(false)
    .notNull(),
  isSuitableForKitchen: boolean("is_suitable_for_kitchen")
    .default(false)
    .notNull(),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: text("created_by").references(() => user.id),
});

// Slug History
export const slugHistory = pgTable("slug_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  oldSlug: text("old_slug").notNull(),
  newSlug: text("new_slug").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
