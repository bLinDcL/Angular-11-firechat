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
      if ( !user ) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  login( proveedor: string ) {
    if (proveedor === 'Google') {
      this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else if ( proveedor === 'Twitter' ) {
      this.angularFireAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }
  logout() {
    this.usuario = {};
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
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }

    return this.itemColletion.add( mensaje );
  }
}
