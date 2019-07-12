import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from "../interface/mensaje.interface";
import { map } from 'rxjs/operators';
import { text } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemColletion: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];

  constructor( private angularFireStore: AngularFirestore) {}

  cargarMensajes(){
    this.itemColletion = this.angularFireStore.collection<Mensaje>('chats');
    return this.itemColletion.valueChanges().pipe(map( (mensajes:Mensaje[]) => {
      this.chats = mensajes;
    }));
  }

  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      nombre: 'Felipe',
      mensaje: texto,
      fecha: new Date().getTime()
    }

    return this.itemColletion.add( mensaje );
  }
}
