import { Component } from '@angular/core';
import { ChatService } from "../../providers/chat.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  constructor( public _chatService: ChatService ) { }

  ingresar( proveedor: string ) {
    console.log(proveedor);
    this._chatService.login( proveedor );
  }
}
