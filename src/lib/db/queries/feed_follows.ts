import { eq, and } from "drizzle-orm";
import { db } from "..";
import { type FeedFollow, feedFollows, feeds, users } from "../schema";

export type ExtFeedFollow = FeedFollow & {
    userName: string;
    feedName: string;
    feedURL: string;
}

export async function createFeedFollow(userId: string, feedId: string) {
    const [newFeedFollow] = await db.insert(feedFollows).values({
        userId: userId,
        feedId: feedId,
    }).returning();

    const [result] = await db.select({
        id: feedFollows.id,
        createdAt: feedFollows.createdAt,
        updatedAt: feedFollows.updatedAt,
        userId: feedFollows.userId,
        feedId: feedFollows.feedId,
        userName: users.name,
        feedName: feeds.name,
        feedURL: feeds.url,
    })
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(
        and(
            eq(feedFollows.id, newFeedFollow.id), 
            eq(users.id, newFeedFollow.userId),
        )
    );

    return result;
}

export async function getFeedFollowsForUser(userId: string) {
    const result = await db.select({
        id: feedFollows.id,
        createdAt: feedFollows.createdAt,
        updatedAt: feedFollows.updatedAt,
        userId: feedFollows.userId,
        feedId: feedFollows.feedId,
        userName: users.name,
        feedName: feeds.name,
        feedURL: feeds.url,
    })
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.userId, userId));

    return result;
}

export async function deleteFeedFollow(feedFollowId: string) {
    await db.delete(feedFollows).where(eq(feedFollows.id, feedFollowId));
}