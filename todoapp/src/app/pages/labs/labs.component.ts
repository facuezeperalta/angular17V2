import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss'
})
export class LabsComponent {
  welcome = 'Hola,Facu';
  tasks = [
    'Instalar Angular CLI',
    'Crear el proyeecto',
    'Crear componentes'
  ]
  name = "Facundo";
  age = 29;
}
