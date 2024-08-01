import { TestBed } from '@angular/core/testing';

import { VincularPeriodoCarreraService } from './vincular-periodo-carrera.service';

describe('VincularPeriodoCarreraService', () => {
  let service: VincularPeriodoCarreraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VincularPeriodoCarreraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
