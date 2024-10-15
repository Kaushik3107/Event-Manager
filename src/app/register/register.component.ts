import { Component } from '@angular/core';
import { AppwriteService } from '../appwrite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(
    private appwriteService: AppwriteService,
    private router: Router
  ) {}

  register() {
    this.appwriteService.register(this.email, this.password).then(
      () => {
        alert('Registration Successful!');
        this.router.navigate(['/login']);
      },
      (err) => alert(`Error: ${err.message}`)
    );
  }
}
