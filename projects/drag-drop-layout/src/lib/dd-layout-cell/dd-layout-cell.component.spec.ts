import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdLayoutCellComponent } from './dd-layout-cell.component';

describe('DdLayoutCellComponent', () => {
  let component: DdLayoutCellComponent;
  let fixture: ComponentFixture<DdLayoutCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdLayoutCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdLayoutCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
