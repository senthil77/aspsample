import { PipeTransform, Pipe} from '@angular/core';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash/fp';
@Pipe({name:'filternest'})
export class FilterNestedPipe implements PipeTransform{ 

    transform(items: any, filter: any, defaultFilter: boolean): any {
    
        if (!filter) {
          return items;
        }
    
        if (!Array.isArray(items)) {
          return items;
        }
    
        if (filter && Array.isArray(items)) {

           
                return items.map(element => ({
                    ...element,
                    data: element.data.filter(deepElement => deepElement.Id === filter)
                }))
        }
    }
}