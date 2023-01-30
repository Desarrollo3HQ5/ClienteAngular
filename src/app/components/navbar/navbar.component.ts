import { Component } from '@angular/core';
import { DataService } from '../../empleado/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  Mode: string = "dark";
  Mode_2: string = "light";
  constructor(public dataservice: DataService){}
  Modelight(){
    const mode = document.getElementById("Navbar");
    const Light = document.getElementById('Icon_Mode');
    const Dark = document.getElementById('Icon_Mode_2');
    const Logo_2 = document.getElementById('Logo_2');
    const Logo_3 = document.getElementById('Logo_3');
    mode?.classList.toggle('mode'); 
    if (Light != undefined && Logo_3 != undefined) {Light.style.display = 'none'; Logo_3.style.display = 'none';}
    if (Dark != undefined && Logo_2 != undefined) {Dark.style.display = 'block';  Logo_2.style.display = 'block';}
    this.dataservice.DisparadorModo.emit({data:this.Mode});
  }
  Modedark(){
    const mode = document.getElementById("Navbar");
    const Light = document.getElementById('Icon_Mode');
    const Dark = document.getElementById('Icon_Mode_2');
    const Logo_2 = document.getElementById('Logo_2');
    const Logo_3 = document.getElementById('Logo_3');
    mode?.classList.toggle('mode'); 
    if (Light != undefined && Logo_3 != undefined) {Light.style.display = 'block'; Logo_3.style.display = 'block';}
    if (Dark != undefined && Logo_2 != undefined) {Dark.style.display = 'none';   Logo_2.style.display = 'none';}
    this.dataservice.DisparadorModo.emit({data:this.Mode_2});
  }
}
