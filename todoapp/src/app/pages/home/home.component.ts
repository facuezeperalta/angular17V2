import { Component,signal,Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Task} from '../../models/task.model'
import {FormControl, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks = signal<Task[]>( [
    {
      id: Date.now(),
      title: 'Comprar Nikon Z6III',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Comprar pan integral',
      completed:false
    }
   /*  'Instalar Angular CLI',
    'Crear el proyeecto',
    'Crear componentes',
    'Trabajar con signals es bueno',
    'Armar presupuestos',
    'Armar una estratégia de Marketing' */
  ])

  //agregando una tarea
  changeHandler(event:Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
    input.value = '';
  }

  addTask(title:string){
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.update((tasks) => [...tasks,newTask])
  }


  deleteTask(index: Number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index )); //filtro dejando por fuera el que coincide en la posición.
  }


  /* aca nos basamos en el patron de no mutar el array.  */
  updateTask(index: Number){
    this.tasks.update((tasks) =>{
      return tasks.map((task,position) =>{
        if(position === index){
          return{
            ...task,
            completed: !task.completed
          }
        }
        return task
      })
    })
  }

  newTaskCtrl = new FormControl('',
    {
      nonNullable : true,
      validators: [
        Validators.required
      ]
    }
  );
  inputHandler(event: Event){
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim(); /* trim elimna los espacios */
      if (value != ''){
        this.addTask(value);
        this.newTaskCtrl.setValue("")
      }
    }

  }

}
