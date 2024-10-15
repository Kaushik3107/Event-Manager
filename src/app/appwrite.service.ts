// import { Injectable } from '@angular/core';
// import { Client, Account, Databases } from 'appwrite';

// @Injectable({
//   providedIn: 'root',
// })
// export class AppwriteService {
//   private client = new Client();
//   private account = new Account(this.client);
//   private database: Databases;

//   constructor() {
//     this.client
//       .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
//       .setProject('670d00900010f38bef49'); // Your project ID

//     this.database = new Databases(this.client);
//   }

//   // User authentication
//   register(email: string, password: string) {
//     return this.account.create('unique()', email, password);
//   }

//   login(email: string, password: string) {
//     return this.account.createEmailPasswordSession(email, password);
//   }

//   // Event CRUD operations
//   createEvent(data: any) {
//     return this.database.createDocument(
//       '670d038d001970852df1',
//       '670d03a7002a4942aaac',
//       'unique()',
//       data
//     );
//   }

//   getEvents() {
//     return this.database.listDocuments(
//       '670d038d001970852df1',
//       '670d03a7002a4942aaac'
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { Client, Account, Databases } from 'appwrite';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  private client: Client;
  private account: Account;
  private databases: Databases;

  constructor() {
    this.client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1') // Use 'http://localhost/v1' if running locally
      .setProject('670d00900010f38bef49'); // Replace with your Project ID

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  // User registration
  async register(email: string, password: string) {
    return await this.account.create('unique()', email, password);
  }

  // User login
  async login(email: string, password: string) {
    try {
      // Create a new session
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log('Login successful:', session);
      return session; // Return the session object
    } catch (error: any) {
      console.error('Login Error:', error.message);
      throw new Error('Login Failed: ' + error.message);
    }
  }

  // Logout
  // Logout the current user session
  async logout() {
    try {
      await this.account.deleteSession('current');
      console.log('Logout successful');
    } catch (error: any) {
      console.error('Logout Error:', error.message);
    }
  }

  // Create event
  async createEvent(eventData: any) {
    try {
      const currentUser = await this.account.get(); // Ensure the user is authenticated
      console.log('Current User:', currentUser);

      return await this.databases.createDocument(
        '670d038d001970852df1', // Database ID
        '670d03a7002a4942aaac', // Collection ID
        'unique()', // Document ID
        eventData, // Event data
        [`user:${currentUser.$id}`] // Permission for only the event creator
      );
    } catch (error: any) {
      console.error('Error Creating Event:', error.message);
      throw new Error('Error Creating Event: ' + error.message);
    }
  }

  // Get all events
  async getEvents() {
    return await this.databases.listDocuments(
      '670d038d001970852df1', // Database ID
      '670d03a7002a4942aaac' // Collection ID
    );
  }

  async checkActiveSession() {
    try {
      const session = await this.account.getSession('current');
      console.log('Active session:', session);
      return session;
    } catch (error: any) {
      console.warn('No active session:', error.message);
      return null; // No session found
    }
  }
}
