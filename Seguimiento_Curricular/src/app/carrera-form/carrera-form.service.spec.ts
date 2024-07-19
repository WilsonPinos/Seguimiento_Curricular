import { TestBed } from '@angular/core/testing';

import { CarreraFormService } from './carrera-form.service';

describe('CarreraFormService', () => {
  let service: CarreraFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarreraFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
