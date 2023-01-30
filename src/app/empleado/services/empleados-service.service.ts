import { Injectable } from '@angular/core';
//MODELOS
import { cliente } from "../../empleado/modelos/cliente-modelo";
import { EmpleadosModelo } from "../../empleado/modelos/empleados-modelo";
import { BiometricoModelo } from "../../empleado/modelos/biometrico-modelo";
import { FileModelo } from "../modelos/file-modelo";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosServiceService {


  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  public Cliente:cliente ={display_value:"",ID:""}
  //DOMINIO
  private dominioURL =  "http://164.92.109.128:7000/"
  // private dominioURL =  "http://localhost:7000/"
  //URLS
  private GetEmpleadoURL = this.dominioURL + "empleado/";
  
  //biometrico
  private getURLBiometrico = this.dominioURL + "getbiometrico/"
  private postURlBiometrico = this.dominioURL + "addbiometrico/"
  private putURlBiometrico =this.dominioURL + "updatebiometrico/"
  private UpdateURlFoto =this.dominioURL + "uploadfile/"

  public selectedEmpleado:EmpleadosModelo = {  Nombre_compleo:"",Celular:"",N_mero_de_contrato:"",ID:"",N_mero_de_Identificaci_n:"", Correo_electronico:"",Contrato_Activo:"", CLIENTE1:this.Cliente,Empresa_usuaria:"" };
  public empleadosModelo: EmpleadosModelo = {  Nombre_compleo:"",Celular:"",N_mero_de_contrato:"",ID:"",N_mero_de_Identificaci_n:"", Correo_electronico:"",Contrato_Activo:"", CLIENTE1:this.Cliente,Empresa_usuaria:"" };
  
  //Biometrico
  public BiometricoModelo: BiometricoModelo = {  Nombre:"",Empresa:"",N_mero_de_Identificaci_n:"",IDempelado:"",Fecha_ingreso:"", Fecha_salida:"",Hora_salida:"",Hora_ingreso:"",ID:""};
  public fileModelo:FileModelo = {File:""};

  constructor(private http: HttpClient) {}

  public getEmpleado(_id: string): Observable<EmpleadosModelo> {
    return this.http.get<EmpleadosModelo>(this.GetEmpleadoURL  + _id);
  }
  //Validar registro biometrico
  public getRegistroBiometrico(_id: string, _estado:string,validacion:string): Observable<BiometricoModelo> {
    return this.http.get<BiometricoModelo>(this.getURLBiometrico  + _id+ "/"+_estado + "/" + validacion);
  }
  // public createEmpleado(newEmpleado: EmpleadosModelo ):Observable<EmpleadosModelo> {
  //   return this.http.post<EmpleadosModelo>(this.ChuckUrl);
  // }
  //POST
  public createEmpleado(newBiometrico: BiometricoModelo,Estado:string):Observable<BiometricoModelo>{
    return this.http.post<BiometricoModelo>(this.postURlBiometrico + Estado, newBiometrico, this.httpOptions)
  }
  //PUT
  public updateEmpleado(ID:String ,newBiometrico: BiometricoModelo ):Observable<BiometricoModelo>{
      return this.http.put<BiometricoModelo>(this.putURlBiometrico + ID, newBiometrico)
}
  public uploadFile(ID:string,data:FileModelo):Observable<FileModelo>{
  // Foto_ingreso
  return this.http.post<FileModelo>(this.UpdateURlFoto + ID,data,this.httpOptions)
}
// public createEmpleado(newEmpleado: EmpleadosModelo): Observable<EmpleadosModelo> {
//   newEmpleado= {  Nombre_compleo:"Juan",Celular:"31516",N_mero_de_contrato:"1212",ID:"123123123",N_mero_de_Identificaci_n:"123123123", Correo_electronico:"jujujuj",Contrato_Activo:"2123123", CLIENTE1:this.Cliente }; 
//   return this.http.post<EmpleadosModelo>(this.postURl, newEmpleado, this.httpOptions)
//     // .pipe(
//     //   catchError(this.handleError('addHero', newEmpleado))
//     // );
}
