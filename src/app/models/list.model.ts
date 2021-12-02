import { ListItem } from './list-item.model';

export class List {
    id: number;
    title: string;
    createOn: Date;
    finishOn: Date;
    done: boolean;
    items: ListItem[];

    constructor(title: string){
        this.title = title;
        this.createOn = new Date();
        this.done = false;
        this.items = [];
        this.id = new Date().getTime();
    }
}