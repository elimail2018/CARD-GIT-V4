import { Pipe, PipeTransform } from '@angular/core';


///this pipe is for gender - 
@Pipe({
  name: 'genderTransform'
})
export class GenderTransformPipe implements PipeTransform {

  transform(value: number): string {


    let newStr: string = "";

    switch (value) {
      case 1: {
        //statements;
        newStr = "זכר";
        break;
      }
      case 2: {
        //statements;
        newStr = "נקבה";
        break;
      }
      case 3: {
        //statements;
        newStr = "אחר";
        break;
      }
      default: {
        //statements; 
        break;
      }
    }


    return newStr + "(pipe)";
  }

}
