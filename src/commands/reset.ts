import { deleteUsers } from "../lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]): Promise<void> {
    await deleteUsers();
    console.log("Database reset successfully!");
}