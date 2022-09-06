import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma!:FormGroup;
  constructor(private form: FormBuilder) {
    this.crearFormulario();
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

  crearFormulario(){
    this.forma = this.form.group({
      nombre   :["",   [Validators.required, Validators.minLength(3)]],
      apellido :["",   [Validators.required, Validators.minLength(3)]],
      genero   :["",   [Validators.required]],
      email    :["",   [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      direccion:this.form.group({
        distrito: ["",[Validators.required]],
        ciudad  : ["",[Validators.required]],
      })
    })
  }
  onSubmit(){
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
  }

}