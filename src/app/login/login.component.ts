import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppwriteService } from '../appwrite.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(
    private appwriteService: AppwriteService,
    private router: Router
  ) {}

  login() {
    this.appwriteService.login(this.email, this.password).then(
      () => {
        alert('Login Successful!');
        this.router.navigate(['/events']);
      },
      (err: { message: any }) => alert(`Login Failed: ${err.message}`)
    );
  }

  ngOnInit() {
    this.appwriteService.checkActiveSession().then(
      (session) => {
        if (session) {
          console.log('Already logged in:', session);
          this.router.navigate(['/events']); // Redirect to events if already logged in
        }
      },
      (err) => console.error('No active session found:', err.message)
    );
  }
}
