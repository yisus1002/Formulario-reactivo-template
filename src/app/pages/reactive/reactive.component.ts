import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValiadadoresService } from 'src/app/services/valiadadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma!:FormGroup;
  constructor(private form: FormBuilder,
              private validadores: ValiadadoresService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListenes();
   }

  ngOnInit(): void {
    
  }
  get nombreNoValido(){
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched;
  }
  get apellidoNoValido(){
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched;
  }
  get emailNoValido(){
    return this.forma.get('email')?.invalid && this.forma.get('email')?.touched;
  }
  get generoNoValido(){
    return this.forma.get('genero')?.invalid && this.forma.get('genero')?.touched;
  }
  get distritoNoValido(){
    return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched;
  }
  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched;
  }
  get pasatiempos(){
   return this.forma.get('pasatiempos') as FormArray
  }
  get pass1NoValido(){
   return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched;
  }
  get usuarioNovalido(){
  //  return {
    if(this.forma.get('usuario')?.value<=0 && this.forma.get('usuario')?.touched){
      return this.forma.get('usuario')?.setErrors({
        vacio:true
      });
    }else{
      return  this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched;
    }
  //  }
  }
  get pass2NoValido(){ 
    const pass1 =this.forma.get('pass1')?.value;
    const pass2 =this.forma.get('pass2')?.value;
    return (pass1===pass2) ? false : true;
   }


  crearFormulario(){
    this.forma = this.form.group({
      nombre   :["",   [Validators.required, Validators.minLength(3)]],
      apellido :["",   [Validators.required, Validators.minLength(3), this.validadores.noHerrera]],
      genero   :["",   [Validators.required]],
      email    :["",   [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      pass1    :["",   [Validators.required, Validators.minLength(3)]],
      pass2    :["",   [Validators.required, Validators.minLength(3)]],
      direccion:this.form.group({
        distrito: ["",[Validators.required]],
        ciudad  : ["",[Validators.required]],
      }),
      pasatiempos:this.form.array([]),
      usuario    :["",[Validators.required], [this.validadores.existeUsuario]]  
    },{
      validators : this.validadores.passwordIguales('pass1', 'pass2')
    })
  }
  crearListenes(){
    //Para saber los valores cambiados del formulario
    this.forma.valueChanges.subscribe(valor=>{
      console.log(valor)
    });
    //Para saber el status del formulario
    this.forma.statusChanges.subscribe(estatus=>{
      console.log({estatus})
    });
    // Para saber un campo en especifico del formulario
    this.forma.get('nombre')?.valueChanges.subscribe(console.log)

  }

  agreagrPasatiempo(){
    this.pasatiempos.push(this.form.control('', [Validators.minLength(3)]))
  }
  borrarPasatiempo(i:any){
    this.pasatiempos.removeAt(i);
  }


  onSubmit(){
    console.log(this.forma)
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(controls=>{
        if(controls instanceof FormGroup){
          Object.values(controls.controls).forEach(controls=>controls.markAllAsTouched());
        }else{
          controls.markAllAsTouched()
        }
      }
      )};
    console.log(this.forma.value)
    this.forma.reset()
    // this.forma.reset();
  }
  cargarDataAlFormulario(){
    this.forma.reset( {
      nombre: "Jesus David",
      apellido: "Garcia Hernandez",
      genero: "M",
      email: "yisusgarcia100@gmail.com",
      direccion: {
        distrito: "Cordoba",
        ciudad: "Monteria"
      },
      pass1: "12345",
      pass2: "12345",
    });
    ['Comer', 'Jugar']
    .forEach?.((valor:any) => this.pasatiempos.push( this.form.control(valor)))
  }
  
}
