import { Component, OnInit } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-jploft',
  templateUrl: './jploft.component.html',
  styleUrls: ['./jploft.component.css'],
  providers: [MessageService]
})
export class JploftComponent implements OnInit {
  data;
  constructor(private clientIO:Socket,private messageService: MessageService) { }

  ngOnInit(): void {
    
    this.data=[
        {
          "name": "Bamboo Watch",
          "category": "Accessories",
          "quantity": 24
        },
        {
          "name": "Black Watch",
          "category": "Accessories",
          "quantity": 61
        },
        {
          "name": "Blue Band",
          "category": "Fitness",
          "quantity": 5
        },
        {
          "name": "Blue T-Shirt",
          "category": "Clothing",
          "quantity": 25
        },
        {
          "name": "Bracelet",
          "category": "Accessories",
          "quantity": 73
        },
        {
          "name": "Brown Purse",
          "category": "Accessories",
          "quantity": 0
        },
        {
          "name": "Chakra Bracelet",
          "category": "Accessories",
          "quantity": 5
        },
        {
          "name": "Galaxy Earrings",
          "category": "Accessories",
          "quantity": 23
        },
        {
          "name": "Game Controller",
          "category": "Electronics",
          "quantity": 2
        },
        {
          "name": "Gaming Set",
          "category": "Electronics",
          "quantity": 63
        }
      ]
    
  }

  rowReOrder(ev,value){
   
    let data={
      firsArr:value[ev?.dropIndex],
      secondArr:value[ev?.dragIndex],
      dragIndex:ev.dragIndex,
      dropIndex:ev.dropIndex
    }
    this.clientIO.emit('new data',data); 

    this.messageService.add({key: 'myKey1',severity:'info', summary:'UpdateMessage', detail:`${data.firsArr.name} is order to ${data.dropIndex+1} position and ${data.secondArr.name} is order to ${data.dragIndex+1} position`});

    
  }

}
