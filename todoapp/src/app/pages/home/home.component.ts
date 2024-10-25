import { Component,signal,Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks = signal( [
    'Instalar Angular CLI',
    'Crear el proyeecto',
    'Crear componentes',
    'Trabajar con signals es bueno',
    'Armar presupuestos',
    'Armar una estratégia de Marketing'
  ])

  //agregando una tarea
  changeHandler(event:Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.tasks.update((tasks) => [...tasks,newTask]);
    input.value = '';
  }
  deleteTask(index: Number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index )); //filtro dejando por fuera el que coincide en la posición.
  }
}
