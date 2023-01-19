import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(items: any[], page: number = 0, search: string = '', size: number = 5): any[] {

    if (!items.length) return []

    items.slice(page * size, (page + 1) * size)

    if (search.length === 0)
      return items.slice(page * size, (page * size) + size);


    const filtereditems = items.filter(items => {
      return propiedad(items).filter(p => p.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase())).length !== 0
    })


    //const filtereditems = items.filter(filt => filt.name.includes(search));
    return filtereditems.slice(page, page + size);

  }

}

function propiedad(Objecto: any) {
  return Object.keys(Objecto).map(p => Objecto[p])
}


