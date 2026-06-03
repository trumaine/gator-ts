import { getFeedByURL } from "src/lib/db/queries/feeds";
import { 
    type ExtFeedFollow, 
    createFeedFollow, 
    deleteFeedFollow, 
    getFeedFollowsForUser, 
} from "src/lib/db/queries/feed_follows";
import { User } from "src/lib/db/schema";

export async function handlerFollow(cmdName: string, user: User, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <feed_url>`);
    }

    const feedURL = args[0];
    const feed = await getFeedByURL(feedURL);
    if (!feed) {
        throw new Error(`Feed not found: ${feedURL}`);
    }

    const feedFollow = await createFeedFollow(user.id, feed.id);
    if (!feedFollow) {
        throw new Error("Failed to create follow");
    }

    console.log("Feed follow created successfully:")
    printFeedFollow(feedFollow);
}

export async function handlerListFeedFollows(_: string, user: User): Promise<void> {
    const feedFollows = await getFeedFollowsForUser(user.id);
    if (!feedFollows || feedFollows.length === 0) {
        console.log(`No follows found for this user.`);
        return;
    }

    console.log(`Feed follows for user %s:\n`, user.id);
    for (let follow of feedFollows) {
        console.log(`* %s`, follow.feedName);
    }
}

export function printFeedFollow(follow: ExtFeedFollow) {
    console.log(`* User:          ${follow.userName}`);
    console.log(`* Feed:          ${follow.feedName}`);
    console.log(`* Feed URL:      ${follow.feedURL}`);
}

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <feed_url>`);
    }

    const feedURL = args[0];

    const feedFollows = await getFeedFollowsForUser(user.id);
    if (!feedFollows || feedFollows.length === 0) {
        console.log(`No follows found for this user.`);
        return;
    }

    let feedFollowId = null;
    for (let follow of feedFollows) {
        if (follow.feedURL === feedURL) {
            feedFollowId = follow.id;
        }
    }

    if (feedFollowId === null) {
        console.log("User does not follow this feed.");
        return;
    }

    await deleteFeedFollow(feedFollowId);
    console.log("Successfully unfollowed %s", feedURL);
}