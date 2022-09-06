import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaisService {
  url='https://restcountries.com/v3.1/'
  constructor(private http: HttpClient) { }


  public getPais(){
    return this.http.get(`${this.url}lang/spa`)
    .pipe(
      map( (resp:any)=>{
        return resp.map((pais:any)=>{
          return {
            nombre: pais.name.common,
            codigo: pais.cca3,
          }
        })
      })
    )
  }
}
