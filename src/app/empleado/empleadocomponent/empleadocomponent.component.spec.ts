import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadocomponentComponent } from './empleadocomponent.component';

describe('EmpleadocomponentComponent', () => {
  let component: EmpleadocomponentComponent;
  let fixture: ComponentFixture<EmpleadocomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadocomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadocomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
