import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropLayoutComponent } from './drag-drop-layout.component';

describe('DragDropLayoutComponent', () => {
  let component: DragDropLayoutComponent;
  let fixture: ComponentFixture<DragDropLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragDropLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
