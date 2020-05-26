import { FavsModalComponent } from './../favs-modal/favs-modal.component';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private modalService: BsModalService) { }


  public openFavs() {
    this.modalService.show(FavsModalComponent, { class: 'modal-lg' });
  }

}
