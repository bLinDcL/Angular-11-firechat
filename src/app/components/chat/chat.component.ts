import { Component } from '@angular/core';
import { ChatService } from "../../providers/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent {
  mensaje: string = "";

  constructor( public _chatService: ChatService ) {
    this._chatService.cargarMensajes().subscribe( (mensajes:any[]) => console.log(mensajes) );
  }

  enviarMensaje(){
    console.log(this.mensaje);
  }

}
