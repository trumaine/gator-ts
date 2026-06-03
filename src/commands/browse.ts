import { getPostsForUser } from "src/lib/db/queries/posts";
import { User } from "src/lib/db/schema";

export async function handlerBrowse(cmdName: string, user: User, ...args: string[]): Promise<void> {
    let limit = 2;
    if (args.length > 1) {
        throw new Error(`usage: ${cmdName} [limit]`);
    }
    if (args.length === 1) {
        const limitArg = Number(args[0]);
        if (!Number.isInteger(limitArg) || limitArg <= 0) {
            throw new Error(`invalid limit: ${args[0]}`);
        }
        limit = limitArg;
    }

    const posts = await getPostsForUser(user.id, limit);
    console.log(`Showing ${limit} posts for ${user.name}`);
    console.log("=====================================");
    for (const post of posts) {
        console.log(`--- ${post.title} ---`);
        console.log(` *  ${post.description} **`);
        console.log(` *  From: ${post.feedName} **`);
        console.log(` *  URL: ${post.url} **`);
        console.log(` *  Published: ${post.publishedAt} **`);
        console.log("=====================================");
    }
}