import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule],
})
export class PublicacionesPage {

  publicaciones: any[] = [];

  constructor(
    private storage: StorageService,
    private alertController: AlertController
  ) {}

  async ionViewWillEnter() {
    this.publicaciones = await this.storage.obtenerPublicaciones();
  }

  //  Modal de confirmación para eliminar
  async confirmarEliminar(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Está seguro que desea eliminar esta publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.eliminarPublicacion(index);
          }
        }
      ]
    });

    await alert.present();
  }

  //  Eliminar publicación (pantalla + storage)
  async eliminarPublicacion(index: number) {
    this.publicaciones.splice(index, 1);
    
  }
}
