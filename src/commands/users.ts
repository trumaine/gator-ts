import { readConfig, setUser } from "../config";
import { getUser, createUser, getUsers } from "../lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }

    const userName = args[0];
    const existingUser = await getUser(userName);
    if (!existingUser) {
        throw new Error(`User '${userName}' not found`);
    }

    setUser(existingUser.name);
    console.log("User switched successfully!");
}

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }

    const userName = args[0];

    const existingUser = await getUser(userName);
    if (existingUser) {
        throw new Error(`User '${userName}' already exists`);
    }

    const newUser = await createUser(userName);
    if (!newUser) {
        throw new Error("Unable to create user");
    } else {
        setUser(newUser.name);
        console.log("User created successfully!");
    }
}

export async function handlerUsers(cmdName: string, ...args: string[]): Promise<void> {
    const users = await getUsers();
    const config = readConfig();

    for (const user of users){
        if (user.name === config.currentUserName) {
            console.log(` * ${user.name} (current)`);
        } else {
            console.log(` * ${user.name}`);
        }
    }
}