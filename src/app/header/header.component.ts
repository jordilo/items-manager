import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FavsModalComponent } from './../favs-modal/favs-modal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
