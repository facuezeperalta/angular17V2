import { Component, signal } from '@angular/core';
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
  tasks =signal( [
    'Instalar Angular CLI',
    'Crear el proyeecto',
    'Crear componentes',
    'Trabajar con signals es bueno'
  ])
  name = signal("Eze");
  age = 29;
  disable = true;
  image = "https://http2.mlstatic.com/D_NQ_NP_940349-MLA78300890977_082024-O.webp";
  AltImage1 = "Esta es una imagen de una cámara Z6III";
  //creo un obejto persona.
  person ={
    name: "Facundo",
    age: 29,
    avatar: "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
  }
  clickhandler(){
    alert("Botón pulsado")
  }
  changeHandler(event:Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue) /* aca modifico la señal */
  }
  keydownHandler(event:KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
  keyDownShitT(){
    alert("Se pulso shift + t");

  }

}
