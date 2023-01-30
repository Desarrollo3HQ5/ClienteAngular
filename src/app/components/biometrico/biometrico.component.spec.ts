import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometricoComponent } from './biometrico.component';

describe('BiometricoComponent', () => {
  let component: BiometricoComponent;
  let fixture: ComponentFixture<BiometricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiometricoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiometricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
