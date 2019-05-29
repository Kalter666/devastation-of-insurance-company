import { TestBed } from '@angular/core/testing';

import { Model3Service } from './model3.service';

describe('Model3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Model3Service = TestBed.get(Model3Service);
    expect(service).toBeTruthy();
  });
});
