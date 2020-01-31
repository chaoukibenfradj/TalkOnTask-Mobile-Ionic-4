import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeetingSeePage } from './meeting-see.page';

describe('MeetingSeePage', () => {
  let component: MeetingSeePage;
  let fixture: ComponentFixture<MeetingSeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingSeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeetingSeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
