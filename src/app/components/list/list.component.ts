import { Component, Input, ViewChild } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { ToDoService } from '../../services/to-do.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {

  @ViewChild(IonList) list: IonList;
  @Input() done = true;

  constructor(public toDoService: ToDoService,
              private router: Router,
              private alertController: AlertController) { }

  selectedList(list: List){
    if(this.done){
      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
    }    
  }

  deleteList(list: List){
    this.toDoService.deleteList(list);
  }

  async editList(list: List){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: list.title,
          placeholder: 'List Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Update',
          handler: (data) => {
            console.log(data);
            if (data.title.length === 0){
              return;
            }
            list.title = data.title;
            this.toDoService.saveStorage();
            this.list.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }

}
