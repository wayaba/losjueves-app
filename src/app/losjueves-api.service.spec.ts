import { TestBed } from '@angular/core/testing';

import { LosjuevesApiService } from './losjueves-api.service';

describe('LosjuevesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LosjuevesApiService = TestBed.get(LosjuevesApiService);
    expect(service).toBeTruthy();
  });
});
