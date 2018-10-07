import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pwPipe'
})
export class PwPipePipe implements PipeTransform {

  transform(password: any, args?: any): string {
    let l = password.length > 10 ? 10: password.length;
    let res = "";
    while(l > 0){
      res += "*";
      l -= 1;
    }
    return res
  }
}
