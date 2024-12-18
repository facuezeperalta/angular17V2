import { Component,computed,input,signal,Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Task} from '../../models/task.model'
import {FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { retryWhen } from 'rxjs';

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
  updateTaskEditingMode(index: number){
    if(this.tasks()[index].completed) return; /* evitamos que una tarea completada se pueda editar  */
    this.tasks.update(prevState =>{
      return prevState.map((task,position) =>{
        if (position === index){
          return{
            ...task,
            editing: true /* cambio el valor a true de la tarea seleccionada */
          }
        }
        return {
          ...task,
          editing: false,
        }
      })
    })

    }
    updateTextEditingMode(index: number, event: Event){
      const input = event.target as HTMLInputElement;
      this.tasks.update(prevState =>{
        return prevState.map((task,position) =>{
          if (position === index){
            return{
              ...task,
              title: input.value, /* Tomo el valor del texto */
              editing: false/* salgo del modo edicion */
            }
          }
          return task;
        })
      })

      }
      filter = signal <'all' | 'pending' | 'completed' /* defino las posibles opciones de filtrado */>('all'); /* creao el estado para todas las tareas */
      changeFilter(filter: 'all' | 'pending' | 'completed'){ /* limito las opciones de string que le puedo enviar como parametros al filtro */
        this.filter.set(filter)
      }
      taskByFilter = computed(() =>{
        const filter = this.filter(); /* obtengo el estado actual del filtro */
        const tasks = this.tasks();
        if (filter === 'pending'){
          return tasks.filter(task => !task.completed)
        }
        if(filter === 'completed'){
          return tasks.filter(task => task.completed)
        }
        return tasks;
      } )
}
