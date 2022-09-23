import { Injectable } from '@angular/core';
import {Observable,of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Task } from 'src/app/Task';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

const headers:Object = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks'

  constructor(private http:HttpClient) { }

  getTasks(): Observable<Task[]>
  {
   return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task:Task): Observable<Task>{
    const url=`${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<any> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, headers);
  }

  addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.apiUrl, task, headers);
  }
}
