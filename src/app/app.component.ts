import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppwriteService } from './appwrite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Frontend-event';
  isLoggedIn: boolean = false; // Track user login state

  constructor(
    private appwriteService: AppwriteService,
    private router: Router
  ) {}

  async ngOnInit() {
    const session = await this.appwriteService.checkActiveSession();
    this.isLoggedIn = !!session; // Set login status based on session presence
  }

  async logout() {
    await this.appwriteService.logout();
    this.isLoggedIn = false; // Hide logout button
    this.router.navigate(['/home']); // Redirect to home after logout
  }
}
