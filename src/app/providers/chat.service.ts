import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from "../interface/mensaje.interface";
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemColletion: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor( private angularFireStore: AngularFirestore, public angularFireAuth: AngularFireAuth ) {
    this.angularFireAuth.authState.subscribe( user => {
      console.log('Estado del usuario: ', user);
    });
  }

  login( proveedor: string ) {
    if (proveedor === 'Google') {
      this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
  }
  logout() {
    this.angularFireAuth.auth.signOut();
  }

  cargarMensajes(){
    this.itemColletion = this.angularFireStore.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(10) );
    return this.itemColletion.valueChanges().pipe(map( (mensajes:Mensaje[]) => {
      this.chats = [];
      for ( let mensaje of mensajes ) {
        this.chats.unshift( mensaje );
      }
      return this.chats;
    }));
  }

  agregarMensaje( texto: string ) {
    let mensaje: Mensaje = {
      nombre: 'Felipe',
      mensaje: texto,
      fecha: new Date().getTime()
    }

    return this.itemColletion.add( mensaje );
  }
}
