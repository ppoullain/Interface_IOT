import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCommandesComponent } from './info-commandes.component';

describe('InfoCommandesComponent', () => {
  let component: InfoCommandesComponent;
  let fixture: ComponentFixture<InfoCommandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCommandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
