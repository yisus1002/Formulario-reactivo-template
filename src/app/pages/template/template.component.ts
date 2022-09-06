import { PaisService } from './../../services/pais.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { finalize, pipe } from 'rxjs';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  usuario={
    nombre:'Jesus',
    apellido:'David',
    email:'yisusgarcia1002@gmail.com',
    pais:'',
    genero:''
  }
  paises:any[]=[];
  constructor(private pais_service:PaisService) {
    
   }

  ngOnInit(): void {
    
    this.pais_service.getPais()
    .pipe(finalize(()=>{
      console.log(this.paises)
    }))
    .subscribe({
      next: (data:any)=>{
        this.paises=(data)
        this.paises.unshift({
          nombre:'Selecciona un pais',
          codigo:''
        })

      },
      error:(err:any)=>{console.log(err)}
    }
    )
  }
  guardar(form:NgForm){
    if(!form.valid){
      // Segunda forma de mostrar alertas en los formularios , la primera esta en el html
      Object.values(form.controls).forEach( control=>{
        control.markAllAsTouched();
      })
      return;
    }
    console.log(form)
    console.log(form.value)
    console.log(form.valid)
  }
}
