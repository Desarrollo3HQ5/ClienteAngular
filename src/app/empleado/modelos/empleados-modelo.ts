import { cliente } from "../../empleado/modelos/cliente-modelo";
export class EmpleadosModelo {
        Nombre_compleo!: string ;
        Celular!: string ; // Contiene la frase
        N_mero_de_contrato!: string ;
        ID!: string ; // Identificador la frase aleatoria
        N_mero_de_Identificaci_n!: string ; // URL que contiene el ID y permite recuperar la frase
        Correo_electronico!: string ;
        CLIENTE1!: cliente;
        Contrato_Activo!:string;
        Empresa_usuaria!:string;
}