import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularPeriodoCarreraComponent } from './vincular-periodo-carrera.component';

describe('VincularPeriodoCarreraComponent', () => {
  let component: VincularPeriodoCarreraComponent;
  let fixture: ComponentFixture<VincularPeriodoCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VincularPeriodoCarreraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VincularPeriodoCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
