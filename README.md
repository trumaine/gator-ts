# Gator 🐊 - An RSS feed aggregator built with TypeScript

## Requirements
* Node (v22.15.0 or later)
* PostgreSQL (v16 or later)

## Tools Used
* drizzle, postgres and drizzle-kit
```
npm i drizzle-orm postgres
npm i -D drizzle-kit
```
* fast-xml-parser

## Installation
### Step 1. Database Creation
Enter the `psql` shell:
* Mac: `psql postgres`
* Linux: `sudo -u postgres psql`

Create a new database. I called mine `gator_ts`.
```
CREATE DATABASE gator_ts;
```
Connect to the database:
```
\c gator_ts
```
Create a default user:
```
ALTER USER postgres PASSWORD 'postgres';
```
You can type `exit` or use `\q` to leave the psql shell. 

You can connect to the database directly using a connection string like so:
```
psql "postgres://postgres:postgres@localhost:5432/gator_ts"
```

### Step 2. Database Migration with Drizzle
The following scripts are configured in the `package.json` to create the required tables.
```
npm run generate
npm run migrate
```

### Step 3. Register a User
In your console, run the following command to create a user:
```
npm run start register <name>
```

## Usage
| Command     | Arguments                 | Description                                                                                                                                                                                                                    |
| ----------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `register`  | `<name>`                  | Register a new user. This user is set as the currently logged in user.                                                                                                                                                         |
| `login`     | `<name>`                  | Switch the currently logged in user.                                                                                                                                                                                           |
| `reset`     |                           | Resets the database by deleting all records, including users. <br>Note: remember to register a new user before running other commands.                                                                                         |
| `users`     |                           | Prints the list of users to the console and notes the current user.                                                                                                                                                            |
| `agg`       | `<time_between_requests>` | Reads all feeds and stores the posts.                                                                                                                                                                                          |
| `addfeed`   | `<name> <url>`            | Registers a new feed for the app to aggregate. Provide a name and the url for the feed as arguments. The current user will follow this feed.                                                                                   |
| `feeds`     |                           | Lists all registered feeds.                                                                                                                                                                                                    |
| `follow`    | `<feed_url>`              | Have the current user follow a previously registered feed given the url.                                                                                                                                                       |
| `following` |                           | List the registered feeds followed by the current user.                                                                                                                                                                        |
| `unfollow`  | `<feed_url>`              | Have the current user unfollow a feed given the url.                                                                                                                                                                           |
| `browse`    | `<limit>`                 | Retrieves a list of recently aggregated posts from the feeds that the current user is following and prints them to the console. <br>Note: The `limit` argument is optional. Running without a limit will print two posts only. |
