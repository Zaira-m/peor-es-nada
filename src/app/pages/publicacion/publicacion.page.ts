import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service'; 

@Component({
  selector: 'app-publicacion',
  standalone: true,
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
})
export class PublicacionPage {
  // Formulario SIN valores por defecto (desde cero)
  titulo: string = '';
  descripcion: string = '';
  foto: string | null = null;

  // Fecha automática (el usuario NO la ingresa)
  fecha: string = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // Para mostrar mensajes de validación solo cuando intente guardar
  submitted: boolean = false;

  constructor(
    private router: Router,
    private storage: StorageService      // inyección del servicio
  ) {}

  seleccionarFoto() {
    console.log('Seleccionar fotografía');

    // Simulación temporal
    this.foto = 'assets/fotos/akita-perdido.png';
  }

  private validar(): string[] {
    const errores: string[] = [];

    const tituloTrim = this.titulo.trim();
    const descTrim = this.descripcion.trim();

    if (!tituloTrim) errores.push('El título es obligatorio.');
    if (tituloTrim && tituloTrim.length < 5)
      errores.push('El título debe tener mínimo 5 caracteres.');

    if (!descTrim) errores.push('La descripción es obligatoria.');
    if (descTrim && descTrim.length < 20)
      errores.push('La descripción debe tener mínimo 20 caracteres.');

    if (!this.foto) errores.push('Debe adjuntar una fotografía.');

    return errores;
  }

  async guardar() {                         //  ES async
    this.submitted = true;

    const errores = this.validar();
    if (errores.length > 0) {
      alert(errores.join('\n'));
      return;
    }

    const nuevaPublicacion = {
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim(),
      fecha: this.fecha,
      imagen: this.foto,
    };

    //  AQUÍ SE USA EL SERVICIO PARA PERSISTIR LA PUBLICACIÓN
    await this.storage.guardarPublicacion(nuevaPublicacion);

    alert('Publicación guardada correctamente');
    this.router.navigate(['/publicaciones']);
  }
}
