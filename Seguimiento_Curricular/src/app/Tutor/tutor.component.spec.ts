import { ComponentFixture, TestBed } from '@angular/core/testing';

import { tutorComponent } from './tutor.component';

describe('AdminComponent', () => {
  let component: tutorComponent;
  let fixture: ComponentFixture<tutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [tutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(tutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
