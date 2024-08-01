import { TestBed } from '@angular/core/testing';

import { ActividadRelacionService } from './actividad-relacion.service';

describe('ActividadRelacionService', () => {
  let service: ActividadRelacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadRelacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
