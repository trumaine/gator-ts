import { db } from "..";
import { feeds } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeed(feedName: string, url: string, userId: string) {
    const [result] = await db.insert(feeds).values({
        name: feedName,
        url: url,
        userId: userId,
    }).returning();
    return result;
}

export async function getFeeds() {
    return await db.select().from(feeds);
}

export async function getFeedByURL(url: string) {
    const [result] = await db.select().from(feeds).where(eq(feeds.url, url));
    return result;
}