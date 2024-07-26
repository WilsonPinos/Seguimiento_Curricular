import { TestBed } from '@angular/core/testing';

import { UsuarioEditarService } from './usuario-editar.service';

describe('UsuarioEditarService', () => {
  let service: UsuarioEditarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioEditarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
