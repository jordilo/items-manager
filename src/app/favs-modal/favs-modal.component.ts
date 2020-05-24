import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-favs-modal',
  templateUrl: './favs-modal.component.html',
  styleUrls: ['./favs-modal.component.scss']
})
export class FavsModalComponent implements OnInit {

  constructor(public modalRef: BsModalRef) { }

  public ngOnInit() {
  }

}
