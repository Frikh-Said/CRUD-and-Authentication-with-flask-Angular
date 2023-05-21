import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigneUpComponent } from './signe-up.component';

describe('SigneUpComponent', () => {
  let component: SigneUpComponent;
  let fixture: ComponentFixture<SigneUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigneUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigneUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
