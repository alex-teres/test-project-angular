import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { Note, NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  newNote = '';

  currentUserSubscription$: Subscription = new Subscription();

  currentUser?: User;

  notes: Note[] = [];

  constructor(
    private notesService: NotesService,
    private authService: AuthService
  ) {}

  createNote(){
    if(this.newNote && this.newNote.length){
      this.notesService.create({text: this.newNote}).subscribe((data)=>{
        this.notes.push(data);
      });
    }
  }

  editNote(note: Note){
    if(note.edit){
      this.notesService.update(note.id, {text: note.text}).subscribe()
    }
  }

  deleteNote(deleteNote: Note, index: number){
    this.notesService.delete(deleteNote.id).subscribe(()=>{
      this.notes.splice(index, 1)
    });
  }

  ngOnInit(): void {
    this.notesService.getAll().subscribe((notes)=>{
      this.notes = notes;
    });
    this.currentUserSubscription$ =
      this.authService.currentUserSubject.subscribe(
        (user) => (this.currentUser = user)
      );
  }

  ngOnDestroy() {
    this.currentUserSubscription$.unsubscribe();
  }
}
