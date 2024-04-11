import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Task } from '../task';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  readonly httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private apiUrl = 'https://devops-todo-api.azurewebsites.net/api/TodoItems'
  constructor(private http:HttpClient ) { }
  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError(error=>{
        console.log(error);
        return []
      })
    )
  }
  addTask(task:Task):Observable<Task>{
    const url = this.apiUrl
    return this.http.post<Task>(url, task)
  }
  editTask(task:Task):Observable<Task>{
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task)
  }
  deleteTask(task:Task):Observable<Task>{
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url)
  }

}
