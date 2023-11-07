import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCardComponent } from './register-card.component';

describe('RegisterCardComponent', () => {
  let component: RegisterCardComponent;
  let fixture: ComponentFixture<RegisterCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterCardComponent]
    });
    fixture = TestBed.createComponent(RegisterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
