import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DevicesService } from 'src/app/shared/services/devices/devices.service';
import { generateId } from 'src/app/shared/helpers/random-id';
import { IDevice } from 'src/app/shared/interfaces/device.interface';

@Component({
  selector: 'app-admin-devices',
  templateUrl: './admin-devices.component.html',
  styleUrls: ['./admin-devices.component.scss']
})
export class AdminDevicesComponent implements OnInit {

  deviceForm: FormGroup;
  devices: IDevice[] = [];

  constructor(private fb: FormBuilder, private deviceService: DevicesService) {
    this.deviceForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadDevices();
    console.log(this.devices)
  }

  loadDevices() {
    this.deviceService.getAll().subscribe(e => {
      console.log('after', e)
      this.devices = e;
    });
  }

  addDevice = () => {
    if (this.deviceForm.value.id) {
      this.deviceService.editDevice(this.deviceForm.value).then(() => {
        this.deviceForm.reset();
        this.loadDevices();
      });
    } else {
      this.deviceService.addDevice({
        ...this.deviceForm.value,
        id: generateId()
      }).then(() => {
        this.deviceForm.reset();
        this.loadDevices();
      });
    }
  }

  editDevice = (device: IDevice) => {
    this.deviceForm.setValue(device);
  }

  deleteDevice = (device: IDevice) => {
    this.deviceService.deleteDevice(device).then(() => {
      this.loadDevices();
    });
  }

}