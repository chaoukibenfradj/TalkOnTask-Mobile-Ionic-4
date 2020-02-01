import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddClientProjectsPage } from './add-client-projects.page';

describe('AddClientProjectsPage', () => {
  let component: AddClientProjectsPage;
  let fixture: ComponentFixture<AddClientProjectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClientProjectsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddClientProjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
