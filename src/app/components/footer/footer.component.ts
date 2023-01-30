import { Component, OnInit } from '@angular/core';
import { DataService } from '../../empleado/services/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  constructor(public dataservices: DataService){}
  Modo : string = "";
  ngOnInit(): void {
      this.dataservices.DisparadorModo.subscribe(data =>{
        this.Modo = data.data;
        if(this.Modo == 'light'){const mode = document.getElementById("Footer"); mode?.classList.toggle('mode'); }
        if(this.Modo == 'dark'){const mode = document.getElementById("Footer"); mode?.classList.toggle('mode'); }
      })
  }
}
