import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadocomponentComponent } from "./empleado/empleadocomponent/empleadocomponent.component";
import { BiometricoComponent } from "./components/biometrico/biometrico.component";

const routes: Routes = [
  { path: '', component: BiometricoComponent },
  { path: 'Empleados', component: EmpleadocomponentComponent },
  { path: 'Empleado/:titulo', component: EmpleadocomponentComponent},
  { path: 'Biometrico', component: BiometricoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
