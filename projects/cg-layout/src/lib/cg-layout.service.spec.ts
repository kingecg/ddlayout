import { TestBed } from '@angular/core/testing';

import { CgLayoutService } from './cg-layout.service';

describe('CgLayoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CgLayoutService = TestBed.get(CgLayoutService);
    expect(service).toBeTruthy();
  });
});
