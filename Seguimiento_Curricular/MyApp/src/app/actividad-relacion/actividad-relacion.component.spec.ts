import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadRelacionComponent } from './actividad-relacion.component';

describe('ActividadRelacionComponent', () => {
  let component: ActividadRelacionComponent;
  let fixture: ComponentFixture<ActividadRelacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActividadRelacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadRelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
