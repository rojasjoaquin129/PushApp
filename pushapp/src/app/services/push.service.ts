
import { Injectable } from '@angular/core';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  userId:string ='';
  constructor(private oneSignal: OneSignal) { }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  mensajes: any[]=[
    {
    title:'titulo de la push',
    body: 'Este es el body de la push',
    date: new Date()
  }];



  configuracionInicial(){
    this.oneSignal.startInit('75b1209c-4995-41ac-82bd-204d7a43aabe', '405160906151');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

  this.oneSignal.handleNotificationReceived().subscribe((noti) => {
 // do something when notification is received
 console.log('notificaicon Recibida',noti);
 this.notificacionRecibida(noti);
  });

  this.oneSignal.handleNotificationOpened().subscribe((noti) => {
  // do something when a notification is opened
    console.log('notificacion abierta',noti);
  });
  this.oneSignal.getIds().then(info=>{
    this.userId=info.userId;
    console.log(this.userId);
  });
  this.oneSignal.endInit();
  }


  notificacionRecibida(noti: OSNotification){
    const payload=noti.payload;
    const existePush =this.mensajes.find(mensaje=>mensaje.notificationID=== payload.notificationID);
    if(existePush){
      return;
    }else{
      this.mensajes.unshift(payload);
    }
  }
}
