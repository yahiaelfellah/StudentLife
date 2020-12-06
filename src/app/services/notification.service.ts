import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Injectable } from '@angular/core';
import { Class } from '../models/class.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private localNotifications: LocalNotifications) { }

  scheduleNotification(classes : Class[]){
    classes.forEach(async (c) => {
      await this.localNotifications.schedule({
        title : `${c.title}`,
        text : 'The class will start in 5 minite',
        // trigger: { every: ELocalNotificationTriggerUnit.WEEK,at: (c.startTime.getTime() - 300000) }
      })
    })
  }
}
