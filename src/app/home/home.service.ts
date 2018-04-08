import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Contato } from './home.model';

@Injectable()
export class HomeService {

  GetData(): Observable<Contato[]> {
    let data:Contato[] = [
        {id:1, nome:"william", email:"william@grupoartisan.com.br"},
        {id:2, nome:"william m da silva", email:"william.moreirasilva@hotmail.com"},
      ];
      
    return of(data);
  }

  GetDataWithTime(): Observable<Contato[]> {
    return new Observable(observer => {
        setInterval(() => {
          observer.next([
            {id:1, nome:"william", email:"william@grupoartisan.com.br"},
            {id:2, nome:"william m da silva", email:"william.moreirasilva@hotmail.com"},
          ]);
        }, 4000)
      })
  }
}
