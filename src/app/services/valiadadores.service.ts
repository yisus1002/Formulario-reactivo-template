import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s:string]:boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValiadadoresService {
  constructor() { }


  noHerrera(control:FormControl): ErrorValidate{
    if(control.value?.toLowerCase()==='herrera'){
      return{
        noHerrera:true,
      }
    }

    return null!;
  }
  passwordIguales(pass1:string, pass2:string){
    return (FormGroup: FormGroup)=>{
      const pass1control = FormGroup.controls[pass1];
      const pass2control = FormGroup.controls[pass2];
      if(pass1control?.value === pass2control?.value){
        pass2control.setErrors(null);
      }else{
        pass2control.setErrors({noEsIgual: true})
      }
    }
  }
  existeUsuario( control:FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate>{
    if( !control.value){
      return Promise.resolve(null!);
    }
    
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        if( control.value === 'jesus'){
          resolve({existe:true})
        }else{
          resolve(null!)
        }
        
      }, 3600);
    });
  }


}
