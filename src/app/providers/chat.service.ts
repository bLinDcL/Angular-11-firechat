import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemColletion: AngularFirestoreCollection<any>;
  public chats: any[] = [];

  constructor( private angularFireStore: AngularFirestore) {}

  cargarMensajes(){
    this.itemColletion = this.angularFireStore.collection<any>('chats');
    return this.itemColletion.valueChanges();
  }
}
