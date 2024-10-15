import { Component, OnInit } from '@angular/core';
import { AppwriteService } from '../appwrite.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor(private appwriteService: AppwriteService) {}

  ngOnInit() {
    this.appwriteService.getEvents().then(
      (response) => (this.events = response.documents),
      (err) => console.error(err)
    );
  }
}
