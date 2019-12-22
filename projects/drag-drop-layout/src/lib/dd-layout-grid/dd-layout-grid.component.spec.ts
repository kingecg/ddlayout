import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdLayoutGridComponent } from './dd-layout-grid.component';

describe('DdLayoutGridComponent', () => {
  let component: DdLayoutGridComponent;
  let fixture: ComponentFixture<DdLayoutGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdLayoutGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdLayoutGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
