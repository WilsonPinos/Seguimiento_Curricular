import { TestBed } from '@angular/core/testing';

import { PeriodoCarreraService } from './periodo-carrera.service';

describe('PeriodoCarreraService', () => {
  let service: PeriodoCarreraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodoCarreraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
