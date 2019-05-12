import { TestBed } from '@angular/core/testing';

import { Model1Service } from './model1.service';

describe('Model1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Model1Service = TestBed.get(Model1Service);
    expect(service).toBeTruthy();
  });
});
