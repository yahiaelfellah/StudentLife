import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MymodalPage } from './mymodal.page';

describe('MymodalPage', () => {
  let component: MymodalPage;
  let fixture: ComponentFixture<MymodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MymodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MymodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
