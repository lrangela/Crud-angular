import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/post';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(Posts: Post[], searchValue: string): Post[] {

    if (!Posts || !searchValue) {
      return Posts
    }

    return Posts.filter(post =>{
     return propiedad(post).filter(p=>p.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())).length !==0
    }

    )
  }

}

function propiedad(Objecto:any){
  return Object.keys(Objecto).map(p=>Objecto[p])
}


