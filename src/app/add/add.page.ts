import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDoService } from '../services/to-do.service';
import { List } from '../models/list.model';
import { ListItem } from '../models/list-item.model';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list: List;
  nameItem = '';

  constructor(private toDoService: ToDoService,
              private route: ActivatedRoute) {
    const listId = this.route.snapshot.paramMap.get('listId');
    this.list = this.toDoService.getList(listId);
  }

  ngOnInit() {
  }
  
  addItem(){
    if (this.nameItem.length === 0) {
      return;
    }
    const newItem = new ListItem(this.nameItem);
    this.list.items.push(newItem);
    this.nameItem = '';
    this.toDoService.saveStorage();
  }

  changeCheck(item: ListItem){
    const pending = this.list.items.filter(itemData => !itemData.complete).length;
    if (pending === 0) {
      this.list.finishOn = new Date();
      this.list.done = true;
    }else{
      this.list.finishOn = null;
      this.list.done = false;
    }
    this.toDoService.saveStorage();
    console.log(this.toDoService.lists);
  }

  delete(i: number){
    this.list.items.splice(i, 1);
    this.toDoService.saveStorage();
  }
}
