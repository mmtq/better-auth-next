import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),

    title: text("title").notNull(),
    content: text("content").notNull(),
});
