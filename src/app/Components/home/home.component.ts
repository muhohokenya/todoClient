import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TaskServiceService } from 'src/app/Services/task-service.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private taskService:TaskServiceService) {}
  tasks:Task[]= [];

  ngOnInit():void{
    this.taskService.getTasks().subscribe(tasks=>{
      this.tasks = tasks
    })
  }
  faPlus = faPlus
  showAddTask:boolean = false
  id:number = 0
  name:string = ""
  isCompleted: boolean = false;
  render:string = "Add"
  
  task:Task = {
    id:  0,
    name: "",
    isCompleted: false
  }
  editTask:Task = this.task;
  AddTask = ()=>{
    let taskToAdd:Task = {
      id: this.id,
      name: this.name,
      isCompleted:this.isCompleted
    }
    this.taskService.addTask(taskToAdd).subscribe(res=>{

      this.taskService.getTasks().subscribe(tasks=>{
        this.tasks = tasks
      })
    })

  }
  editTodo = (task:Task)=>{
    this.name = task.name
    this.render = "Edit"
    this.editTask = task;
  }
  EditTask = ()=>{
  this.editTask.name = this.name
    this.taskService.editTask(this.editTask).subscribe(res=>{
       this.taskService.getTasks()
    })
    this.render = "Add"
  }
  deleteTask = (task:Task)=>{
    this.taskService.deleteTask(task).subscribe(res=>{
      this.taskService.getTasks().subscribe(tasks=>{
        this.tasks = tasks
      })
    })
  } 

}
