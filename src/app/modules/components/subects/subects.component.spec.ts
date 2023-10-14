import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubectsComponent } from './subects.component';

describe('SubectsComponent', () => {
  let component: SubectsComponent;
  let fixture: ComponentFixture<SubectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
