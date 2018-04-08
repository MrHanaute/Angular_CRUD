import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { HomeService } from './home.service';
import { Contato } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ HomeService ],
})
export class HomeComponent implements OnInit {
  public closeResult: string;
  public edit: false;
  public items:Contato[];

  public modalDados:Contato;

  constructor(private modalService: NgbModal, private hs:HomeService) { }

  open(content) {
    if(this.edit){
      this.modalDados = this.items[this.edit]
    }
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnInit() {
    this.hs.GetDataWithTime().subscribe(data => {
      this.items = data;
      this.modalDados = {
        id: this.items.length,    
        nome:"",
        email:""
      }
    })
  }

  addNovo(){
    if(!this.edit){
      this.items.push(this.modalDados)
    }
  }

  deleteItem(index){
    this.items.splice(index, 1);
  }

}
