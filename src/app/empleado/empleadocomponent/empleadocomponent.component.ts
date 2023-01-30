import { Component, OnInit, ViewChild,Output, EventEmitter, ElementRef,} from '@angular/core';
//Servicios
import { EmpleadosServiceService } from "../../empleado/services/empleados-service.service";
//Modelos
import { cliente } from "../../empleado/modelos/cliente-modelo";
import { EmpleadosModelo } from "../../empleado/modelos/empleados-modelo";
import { BiometricoModelo } from "../../empleado/modelos/biometrico-modelo";
import { FileModelo } from "../modelos/file-modelo";
import { FormBuilder, NgForm } from "@angular/forms";
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CamaraComponent } from "../../components/camara/camara.component";
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { ActivatedRoute } from "@angular/router";

import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';
@Component({
  selector: 'app-empleadocomponent',
  templateUrl: './empleadocomponent.component.html',
  styleUrls: ['./empleadocomponent.component.css']
})

export class EmpleadocomponentComponent{  
  N_mero_de_Identificaci_n : string
  public formParent: FormGroup = new FormGroup({}); //Creamos el formulario padre y lo inicializamos
  ngForm : NgForm
  public results:string[]=[];
  public Cliente:cliente ={display_value:"",ID:""}
  public empleados: EmpleadosModelo = {  Nombre_compleo:"",Celular:"",N_mero_de_contrato:"",Contrato_Activo:"",ID:"",N_mero_de_Identificaci_n:"", Correo_electronico:"", CLIENTE1:this.Cliente,Empresa_usuaria:""};
  //Biometrico
  public BiometricoModelo: BiometricoModelo = {  Nombre:"",Empresa:"",N_mero_de_Identificaci_n:"",IDempelado:"",Fecha_ingreso:"", Fecha_salida:"",Hora_salida:"",Hora_ingreso:"",ID:""};
  public newBiometricoModelo: BiometricoModelo = {  Nombre:"",Empresa:"",N_mero_de_Identificaci_n:"",IDempelado:"",Fecha_ingreso:"", Fecha_salida:"",Hora_salida:"",Hora_ingreso:"",ID:""};
  public fileModelo:FileModelo = {File:""};
  
  tituloo: string = '';
  parrafo: string = '';
  titulo !:string|null;
  public triger;
  constructor(public empleadosServiceService: EmpleadosServiceService, private route:ActivatedRoute, private formBuilder: FormBuilder) { 
  }
  public pictureTaken = new EventEmitter<WebcamImage>();
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  // latest snapshot
  public webcamImage: WebcamImage = null;

  @ViewChild("N_mero_de_Identificaci_nI") myInputField: ElementRef;
  @ViewChild("N_mero_de_Identificaci_nS") myInputField2: ElementRef;
  ngAfterViewInit() {
    if (this.route.snapshot.paramMap.get('titulo') == "Ingreso") {
      this.myInputField.nativeElement.focus();
    }
    else{
      this.myInputField2.nativeElement.focus();
    }
  

  }
  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }
  ngOnInit() {
    // this.initFormParent();
    this.N_mero_de_Identificaci_n =""
    this.titulo  = this.route.snapshot.paramMap.get('titulo')
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
    
  }
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
  //Validar empleado
  ValidarEmpleado(Num_Identifiacion:string, Estado:string){
    this.empleadosServiceService.getEmpleado(Num_Identifiacion).subscribe(
      (res) =>{
        if (res.N_mero_de_Identificaci_n != null) {
          this.ValidarBiometrico(Num_Identifiacion, Estado,res)
        }
        else{
          //NOTIFICACION DE NO EXISTE EL EMPLEADO ACTIVO EN EL SISTEMA
          console.log("NO existe") //NOTIFICACIONES
        }
      }
    ); 
  }
  ValidarBiometrico(Num_Identifiacion:string, Estado:string,Empleado_:EmpleadosModelo){
    this.empleadosServiceService.getRegistroBiometrico(Num_Identifiacion,Estado,"1").subscribe(
      (res) =>{
        console.log(res)
        if (Estado == "Ingreso") {  
          if (res.N_mero_de_Identificaci_n != null) {
            //NOTIFIACION DE QUE YA TIENE UN INGRESO EN EL SISTEMA PARA EL HORARIO
            console.log("EXISTE")//NOTIFICACIONES
            
          }
          else{            
            this.newBiometricoModelo.Nombre=Empleado_.Nombre_compleo
            this.newBiometricoModelo.Empresa=Empleado_.Empresa_usuaria
            this.newBiometricoModelo.N_mero_de_Identificaci_n=Empleado_.N_mero_de_Identificaci_n
            this.newBiometricoModelo.IDempelado=Empleado_.ID
            this.addEmpleado(this.newBiometricoModelo,Estado)
            this.getEmpleado(Num_Identifiacion)

          }
        }//SALIDA
        else{
          console.log("SALIDA")
          //SI existe entonces ya hizo registro de salida
          if (res.N_mero_de_Identificaci_n != null) {
            //SE DEBE COLCOAR UNA ALERTA
            //NOTIFIACION DE QUE YA TIENE UNA SALIDA EN EL SISTEMA PARA EL HORARIO
            console.log("ALERTA Existe un registro de salida ya") //NOTIFICACIONES
          }
          else{
            //Validar de nuevo
            this.empleadosServiceService.getRegistroBiometrico(Num_Identifiacion,Estado,"2").subscribe(
              (res) =>{
                      if (res.N_mero_de_Identificaci_n != null) {
                        this.newBiometricoModelo.Nombre=Empleado_.Nombre_compleo
                        this.newBiometricoModelo.Empresa=Empleado_.Empresa_usuaria
                        this.newBiometricoModelo.N_mero_de_Identificaci_n=Empleado_.N_mero_de_Identificaci_n
                        this.newBiometricoModelo.IDempelado=Empleado_.ID
                        this.newBiometricoModelo.ID=res.ID
                        //Actualizar
                        this.updateBiometrico(this.newBiometricoModelo,res.ID)
                        this.getEmpleado(Num_Identifiacion)
                        //NOTIFIACION DE SI SI REGISTRA ENTRADA
                      }
                      else{
                        this.newBiometricoModelo.Nombre=Empleado_.Nombre_compleo
                        this.newBiometricoModelo.Empresa=Empleado_.Empresa_usuaria
                        this.newBiometricoModelo.N_mero_de_Identificaci_n=Empleado_.N_mero_de_Identificaci_n
                        this.newBiometricoModelo.IDempelado=Empleado_.ID
                        this.newBiometricoModelo.ID=res.ID
                        this.addEmpleado(this.newBiometricoModelo,Estado)
                        this.getEmpleado(Num_Identifiacion)
                        //NOTIFIACION DE SI NO REGISTRA ENTRADA
                      }
              }
            )
          }
        }
        
      }
    );
  }
  //Obtener empleado
  getEmpleado(id:string){
    this.empleadosServiceService.getEmpleado(id).subscribe(empleados => (this.empleados = empleados));
  }
  addEmpleado(newBiometrico:BiometricoModelo,Estado:string){
    this.empleadosServiceService.createEmpleado(newBiometrico,Estado).subscribe(
      (res) => {
        this.triggerSnapshot()
        console.log("Ingreso")
        console.log(res.ID)
        console.log(this.webcamImage.imageAsBase64)
        
        let data = this.webcamImage.imageAsBase64;
        this.fileModelo.File=data.toString()
        // this.empleadosServiceService.uploadFile(res.ID,data)
        // this.uploadFile(res.ID,this.fileModelo)
      }
  )
  }
  uploadFile(_ID:string,data:FileModelo){
console.log(data)
    this.empleadosServiceService.uploadFile(_ID,data).subscribe()
  }
  updateBiometrico(newBiometrico:BiometricoModelo,ID:string){
    this.empleadosServiceService.updateEmpleado(ID,newBiometrico).subscribe(
      (res) => {
        console.log(res)
        //NOTIFICACIONES
      }
  )
  }
  //Funciones que reciben del input de numero de identifiacion luego de leer el qr
  values = '';
  timeout: any;
  ingreso(event: any){
    if(this.timeout != null){
      clearTimeout(this.timeout);
     }
    this.timeout = setTimeout(() => {
      const Entrada_ = event.target.value;
      // console.log("validar")
      // console.log(Entrada_)
      var regex1 = /\_+(\d+)+[^\/]*\//g;
      var regex = /(\d+)/g;
      if (Entrada_ != null && Entrada_.length > 5 ) {
        const text_ = Entrada_.match(regex1);
        const Numeros_ = Entrada_.match(regex)
        if (text_ != null) {
          let Numeros_ = text_[0]
          let Numeros1_ = Numeros_.replace("_","").replace("/","")
          console.log(Numeros1_)
        // const Numeros_ = text_.match(regex);
        this.ValidarEmpleado(Numeros1_,"Ingreso");
        event.target.value = Numeros1_;
        this.regresar_inicio();
        event.target.value = "";
        location.reload();
        // this.empleadosServiceService.selectedEmpleado.N_mero_de_Identificaci_n = Numeros1_;
        }
        else if(Numeros_ != null){
          this.ValidarEmpleado(Numeros_,"Ingreso");
          event.target.value = Numeros_;
          this.regresar_inicio();
          event.target.value = "";
        }
      }
      else{
        event.target.value = "";
      }
    },1500); 
  }
        // if (Entrada_ != null && Entrada_.length > 5) {
          //https://creatorapp.zohopublic.com/hq5colombia/hq5/record-pdf/Candidatos_En_Proceso_Qr/3960020000015496108/Carnet_Hq5_1085267473/mmQZY54
          //   this.ValidarEmpleado(Entrada_,"Ingreso");
          //   event.target.value = "";
          //   this.regresar_inicio();
          // }
          // //Obtener solo los numeros con expresión regular
          // var regex = /(\d+)/g;
          // // var regex = /[^Carnet_]//$/g;
          // const Numeros_ = Entrada_.match(regex)
          // console.log(Numeros_)
  salida(event: any){
    if(this.timeout != null){
      clearTimeout(this.timeout);
     }
    this.timeout = setTimeout(() => {
      const Entrada_ = event.target.value;
      console.log("validar")
      console.log(Entrada_)
      var regex1 = /\_+(\d+)+[^\/]*\//g;
      var regex = /(\d+)/g;
      if (Entrada_ != null && Entrada_.length > 5 ) {
        const text_ = Entrada_.match(regex1);
        const Numeros_ = Entrada_.match(regex)
        if (text_ != null) {
          let Numeros_ = text_[0]
          let Numeros1_ = Numeros_.replace("_","").replace("/","")
          console.log(Numeros1_)
        // const Numeros_ = text_.match(regex);
        this.ValidarEmpleado(Numeros1_,"Salida");
        event.target.value = Numeros1_;
        this.regresar_inicio();
        event.target.value = "";
        location.reload();
        // this.empleadosServiceService.selectedEmpleado.N_mero_de_Identificaci_n = Numeros1_;
        }
        else if(Numeros_ != null){
          this.ValidarEmpleado(Numeros_,"Salida");
          event.target.value = Numeros_;
          this.regresar_inicio();
          event.target.value = "";
        }
      }
      else{
        event.target.value = "";
      }
      
    },1500); 
  }
  //Función para regresar al inicio
  regresar_inicio(){
    if(this.timeout != null){
      clearTimeout(this.timeout);
     }
    this.timeout = setTimeout(() => {
    location.href = location.host;
    location.reload();
    },300000); 
  }

  //Camara
  //  title = 'qr-reader';
  //  public cameras:MediaDeviceInfo[]=[];
  //  public myDevice!: MediaDeviceInfo;
  //  public scannerEnabled=false;
  //  camerasFoundHandler(cameras: MediaDeviceInfo[]){
  //    this.cameras=cameras;
  //    this.selectCamera(this.cameras[0].label);
  //  }
 
  //  scanSuccessHandler(event:string){
  //    console.log(event);
  //    this.results.unshift(event);
  //  }
 
  //  selectCamera(cameraLabel: string){    
  //    this.cameras.forEach(camera=>{
  //      if(camera.label.includes(cameraLabel)){
  //        this.myDevice=camera;
  //        console.log(camera.label);
  //        this.scannerEnabled=true;
  //      }
  //    })    
  //  }
}
