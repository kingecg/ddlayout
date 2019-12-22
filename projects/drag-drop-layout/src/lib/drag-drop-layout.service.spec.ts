import { TestBed } from '@angular/core/testing';

import { DragDropLayoutService } from './drag-drop-layout.service';

describe('DragDropLayoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DragDropLayoutService = TestBed.get(DragDropLayoutService);
    expect(service).toBeTruthy();
  });
});
