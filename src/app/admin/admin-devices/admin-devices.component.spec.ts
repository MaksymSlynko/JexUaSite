import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDevicesComponent } from './admin-devices.component';

describe('AdminDevicesComponent', () => {
  let component: AdminDevicesComponent;
  let fixture: ComponentFixture<AdminDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
