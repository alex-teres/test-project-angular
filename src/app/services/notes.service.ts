import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Note {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  edit?: boolean;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  baseUrl = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Note[]> {
    return this.http
      .get<Note[]>(this.baseUrl)
      .pipe(
        map((notes) =>
          notes.sort(
            (a: any, b: any) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        )
      );
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
