
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonsComponent } from './Persons/Persons.component';
import { PersonComponent } from './Person/Person.component';
import { PersonAddEditComponent } from './Person-add-edit/Person-add-edit.component';
import { PersonService } from './services/Person.service';
import { GenderTransformPipe } from './gender-transform.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


import { MatIconModule } from '@angular/material/icon';



import {
  MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule
} from '@angular/material';
import { MyModalComponent } from './my-modal/my-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule } from '@angular/forms';








@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    PersonComponent,
    PersonAddEditComponent,
    GenderTransformPipe,    
    MyModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule

    
  
  ],
  providers: [
    PersonService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [MyModalComponent]
})
export class AppModule { }
