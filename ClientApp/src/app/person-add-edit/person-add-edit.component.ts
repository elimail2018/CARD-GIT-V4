import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '../services/Person.service';
import { Person } from '../models/Person';
import { ModalData } from '../models/modalData';
import { DatePipe } from '@angular/common'


import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MyModalComponent } from '../my-modal/my-modal.component';



@Component({
  selector: 'app-Person-add-edit',
  templateUrl: './Person-add-edit.component.html',
  styleUrls: ['./Person-add-edit.component.scss'],
  providers: [DatePipe] 
})
export class PersonAddEditComponent implements OnInit {
  selected = 'option2';
  gendersList = [ { val: 1, gender: 'זכר' }, { val: 2, gender: 'נקבה' }, { val: 3, gender: 'אחר' }] 

  modal:ModalData

  modalTitle: string;
  modalMessage: string;

  form: FormGroup;
  actionType: string;
  formName: string;
  formEmail: string;
  formPhone: string;
  formGender: string;
  formIdNumber: string;
  formBirthDate: string;
 

  clientValidations: boolean;
  serverValidations: boolean;

  dbID: number;

  errorMessage: any;
  existingPerson: Person;
   

  constructor(private personService: PersonService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {

    this.clientValidations = true; ///wheater to check validation in client
    this.serverValidations = true; ///wheater to check validation in client



    const idParam = 'id';
    this.actionType = 'Add';

    

    this.formName = 'name';
    this.formEmail = 'email';
    this.formPhone = 'phone';
    this.formIdNumber = 'idNumber';
    this.formBirthDate = 'birthDate';
    this.formGender = 'gender';
    
    if (this.avRoute.snapshot.params[idParam]) {
      this.dbID = this.avRoute.snapshot.params[idParam];
    }
    this.buildForm(this.clientValidations);


   
         
  }





  openDialog(title:string, msg:string): void {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '450px',
      data: { modalTitle: title, modalMessage:msg }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.modalMessage = res;
    });
    
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'שדה חובה' :
      this.email.hasError('email') ? 'מייל לא תקין' :
        '';
  }



  ngOnInit() {
    
    if (this.dbID > 0) {
      this.actionType = 'Edit';
      console.log('getPerson');
      console.log(this.dbID);


           this.personService.getPerson(this.dbID)
        .subscribe(data => (
          console.log(data),
          this.existingPerson = data,
          this.form.controls[this.formGender].setValue(data.gender),
          this.form.controls[this.formName].setValue(data.name),
          this.form.controls[this.formEmail].setValue(data.email),
          this.form.controls[this.formPhone].setValue(data.phone),
          this.form.controls[this.formIdNumber].setValue(data.idNumber),
         // this.form.controls[this.formBirthDate].setValue(this.datePipe.transform(data.birthDate, 'yyyy-MM-dd')  )
          this.form.controls[this.formBirthDate].setValue(data.birthDate )//fix for datepicker
         
        ));
    }
  }



  buildForm(validateClient: boolean) {

    let bDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')

    if (this.clientValidations) {
      let pattern = "[0-9]*"
      // reactive form with client validations - if not valid the request will not be sent to server
      this.form = this.formBuilder.group(
        {
          dbID: 0,
          idNumber: ['', [Validators.required,
            Validators.pattern(pattern),
            Validators.minLength(9),
            Validators.maxLength(9)]],
                        
          name: ['', [  Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(20)
          ]],
          email: ['', [ Validators.email]],
          phone: ['', [Validators.minLength(8),
            Validators.maxLength(20),
          ]],
          birthDate: [bDate,[Validators.required]],
          gender: 0
        }
      )

    }
    else {
      this.form = this.formBuilder.group(// reactive form withOUT  client validations
        {
          dbID: 0,
          idNumber: '',
          name: '',
          email: '',
          phone: '',
          birthDate: bDate,
          gender: 0
        }
      )



    }
  }

  onValChange(val: string) {
    console.log(val);

    this.buildForm(this.clientValidations);
  }





  save() {
    if (!this.form.valid) {
      this.openDialog('שגיאה', '-לא ניתן לבצע שמירה-טופס שגוי ');
      return;
    }
   

    if (this.actionType === 'Add') {
      
      let person: Person = {      
        idNumber: this.form.get(this.formIdNumber).value,
        birthDate: new Date(new Date(this.form.get(this.formBirthDate).value)),
        name: this.form.get(this.formName).value,
        phone: this.form.get(this.formPhone).value,
        email: this.form.get(this.formEmail).value,
        gender: this.form.get(this.formGender).value,    
      };
      //alert('saving');
      this.personService.savePerson(person)
        .subscribe((data) => {
          this.router.navigate(['/Person', data.dbID]);
        }, (server_err) => {
            
            let str = 'שגיאת נתונים ' + server_err;
            this.openDialog('שגיאה', str);
        });
    }

    if (this.actionType === 'Edit') {
      //alert(this.form.get(this.formBirthDate).value);
      let person: Person = {
        dbID: this.existingPerson.dbID,
        gender: this.form.get(this.formGender).value,
        idNumber: this.form.get(this.formIdNumber).value,   
        name: this.form.get(this.formName).value,
        email: this.form.get(this.formEmail).value,
        birthDate:new Date(new Date ( this.form.get(this.formBirthDate).value)),
        phone: this.form.get(this.formPhone).value
      };
     // alert('start updating...' + person.dbID);
    
      this.personService.updatePerson(person.dbID, person)
        .subscribe((data) => {
          let str = 'בוצע בהצלחה' + person.dbID;
          this.openDialog('שמירה',str);
          
         // this.router.navigate(['/']);
        },
          (server_err) =>
          {
            let str = 'שגיאת נתונים ' + server_err;
            this.openDialog('שגיאה', str);
            //console.log(server_err); alert("שגיאת נתונים מהשרת - לפרטים נוספים צפה בconsole ")
          });
     
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get name() { return this.form.get(this.formName); }
  get email() { return this.form.get(this.formEmail); }
  get phone() { return this.form.get(this.formPhone); }
  get idNumber() { return this.form.get(this.formIdNumber); }
  get birthDate() { return this.form.get(this.formBirthDate); }
  get gender() { return this.form.get(this.formGender); }

  
}

