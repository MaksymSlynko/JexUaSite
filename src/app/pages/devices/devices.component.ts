import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/app/shared/services/devices/devices.service';
import { IDevice } from 'src/app/shared/interfaces/device.interface';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  devices: IDevice[];

  constructor(private deviceService: DevicesService) { }

  ngOnInit(): void {
    this.deviceService.getAll()
      .subscribe(e => {
        this.devices = e;
      });
  }

  

  slideConfig = {infinite: false, slidesToShow: 3, slidesToScroll: 1};
}
