import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicHomeComponent } from './academic-home.component';

describe('AcademicHomeComponent', () => {
  let component: AcademicHomeComponent;
  let fixture: ComponentFixture<AcademicHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
