import { Page } from "@playwright/test";
import { MongoClient } from "mongodb";

export class CommonMongoDB {
  readonly page: Page;
  private client: MongoClient | null = null;

  constructor(page: Page) {
    this.page = page;
  }

  async connectToMongoDB(): Promise<MongoClient> {
    // Create a new MongoClient if not already connected
    if (!this.client) {
      this.client = new MongoClient(process.env.MONGODB_URI);
      try {
        await this.client.connect(); // Connect to MongoDB
        console.log("Connected to MongoDB successfully.");
      } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
      }
    }
    return this.client; // Return the connected client
  }

  async getUserCollection() {
    const db = this.client!.db(process.env.DB);
    return db.collection(process.env.COLLECTION); // Return the collection \
  }

  async fetchUser(accountId: string) {
    try {
      const client = await this.connectToMongoDB();
      const collection = await this.getUserCollection();

      // Find the user document based on accountId
      const user = await collection.findOne({ accountId: accountId });

      if (user) {
        console.log(`User found:`, user);
        return user; // Return the user document
      } else {
        console.log(`User with accountId: ${accountId} not found.`);
        return null; // Return null if the user is not found
      }
    } catch (error) {
      console.error("Failed to fetch the user:", error);
      return null;
    }
  }

  async deleteUser(accountId: string) {
    try {
      const user = await this.fetchUser(accountId); // Fetch the user first

      if (user) {
        const client = await this.connectToMongoDB();
        const collection = await this.getUserCollection(client); // Get the collection reference

        // Delete the user document based on accountId
        const result = await collection.deleteOne({ accountId: accountId });

        if (result.deletedCount === 1) {
          console.log(`User with accountId: ${accountId} has been deleted.`);
        } else {
          console.log(`Failed to delete user with accountId: ${accountId}.`);
        }
      } else {
        console.log(
          `No user found with accountId: ${accountId}, so deletion was skipped.`
        );
      }
    } catch (error) {
      console.error("Failed to delete the user:", error);
    } finally {
      if (this.client) {
        await this.client.close(); // Close the connection
        console.log("MongoDB connection closed.");
      }
    }
  }
}
