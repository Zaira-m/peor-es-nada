import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  @Input() tituloProyecto: string = 'Peor es Nada';

  @Output() mensajeEmitido = new EventEmitter<string>();

  emitirMensaje() {
    this.mensajeEmitido.emit('Mensaje enviado desde AppComponent');
  }

  constructor() {}
}
