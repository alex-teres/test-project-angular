import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  error = '';

  private destroyed$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {}

  submit(){
    const {email, password} = this.form.value;
    this.authService.login(email, password).pipe(takeUntil(this.destroyed$)).subscribe(
      ()=>{
        this.router.navigate(['/list']);
      }
    );
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

}
