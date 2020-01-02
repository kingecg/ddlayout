import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgLayoutComponent } from './cg-layout.component';

describe('CgLayoutComponent', () => {
  let component: CgLayoutComponent;
  let fixture: ComponentFixture<CgLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
