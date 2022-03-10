import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeiotPage } from './homeiot.page';

describe('HomeiotPage', () => {
  let component: HomeiotPage;
  let fixture: ComponentFixture<HomeiotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeiotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeiotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
