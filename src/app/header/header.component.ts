import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUserSubscription$: Subscription = new Subscription();

  currentUser?: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUserSubscription$ = this.authService.currentUserSubject.subscribe(user=>this.currentUser = user);
  }

  ngOnDestroy(){
    this.currentUserSubscription$.unsubscribe()
  }

  toLogin(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.authService.logout();
  }
}
