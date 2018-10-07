import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pwPipe'
})
export class PwPipePipe implements PipeTransform {
// pipe is used to define custom representation of text on HTML.
// in this case, I want to used * to display each character of the password,
// however, if th password is too long, I will display "*" for 10 times
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
