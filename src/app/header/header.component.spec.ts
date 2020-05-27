import { RouterModule } from '@angular/router';
import { async, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MockedComponentFixture, MockRender, MockService, MockModule } from 'ng-mocks';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FavsModalComponent } from '../favs-modal/favs-modal.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: MockedComponentFixture<HeaderComponent>;
  let showModalSpy: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: BsModalService, useValue: MockService(BsModalService) }],
      imports: [MockModule(RouterModule)]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = MockRender(HeaderComponent);

    const bsModalService = fixture.debugElement.injector.get(BsModalService);
    showModalSpy = spyOn(bsModalService, 'show');
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('when click over the favs button then show modal is called properly', () => {
    const favsBtn = fixture.point.nativeElement.querySelector('.t-favs-open-button') as HTMLButtonElement;
    favsBtn.click();
    expect(showModalSpy).toHaveBeenCalled();
    expect(showModalSpy).toHaveBeenCalledWith(FavsModalComponent, { class: 'modal-lg' });
  });
});
