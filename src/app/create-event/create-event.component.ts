import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppwriteService } from '../appwrite.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
})
export class CreateEventComponent {
  event = {
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: 0,
  };

  constructor(
    private appwriteService: AppwriteService,
    private router: Router
  ) {}

  async createEvent() {
    try {
      await this.appwriteService.createEvent(this.event);
      alert('Event Created Successfully!');
      this.router.navigate(['/events']);
    } catch (err: any) {
      console.error('Error Creating Event:', err);
      alert(`Error Creating Event: ${err.message}`);
    }
  }
}
