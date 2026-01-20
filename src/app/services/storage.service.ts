import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private KEY = 'publicaciones';

  constructor() {}

  // Obtener publicaciones guardadas
  async obtenerPublicaciones(): Promise<any[]> {
    const { value } = await Preferences.get({ key: this.KEY });
    return value ? JSON.parse(value) : [];
  }

  // Guardar una nueva publicación
  async guardarPublicacion(publi: any): Promise<void> {
    const listaActual = await this.obtenerPublicaciones();
    listaActual.push(publi);

    await Preferences.set({
      key: this.KEY,
      value: JSON.stringify(listaActual)
    });
  }

  // Limpiar todas las publicaciones
  async limpiarPublicaciones(): Promise<void> {
    await Preferences.remove({ key: this.KEY });
  }
}
