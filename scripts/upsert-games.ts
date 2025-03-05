import "dotenv/config";
import fs from "fs";
import path from "path";
import { embedAndUpsert } from "./embedAndUpsert";

async function main() {
  try {
    // Path to the game details JSON file
    const gameDetailsPath = path.join(
      process.cwd(),
      "src",
      "lib",
      "data",
      "gameDetailsList.json",
    );

    // Read the game details from the file
    console.log("Reading game details from file...");
    const gameDetailsList = JSON.parse(
      fs.readFileSync(gameDetailsPath, "utf8"),
    );

    console.log(`Found ${gameDetailsList.length} games to process`);

    // Process each game
    for (const gameDetails of gameDetailsList) {
      await embedAndUpsert(gameDetails);
    }

    console.log("Finished processing all games");
  } catch (error) {
    console.error("Error in main function:", error);
  } finally {
    // Close the database connection
    process.exit(0);
  }
}

main();
