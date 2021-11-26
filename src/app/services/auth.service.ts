import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

interface LoginData{
  user: User,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) {
    if(localStorage.getItem('user') !== null){
      this.currentUserSubject.next(JSON.parse(localStorage.getItem('user') || ''));
    }
   }

  login(email:string, password:string ) {
    return this.http.post<LoginData>('http://localhost:3000/auth/login', {email, password})
    .pipe(
      tap((authData: LoginData)=>{
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', JSON.stringify(authData.user));
        this.currentUserSubject.next(authData.user); 
    }));
  }
  
  logout(){
    this.currentUserSubject.next(undefined);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
