import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonsComponent } from './Persons/Persons.component';
import { PersonComponent } from './Person/Person.component';
import { PersonAddEditComponent } from './Person-add-edit/Person-add-edit.component';

const routes: Routes = [
  { path: '', component: PersonsComponent, pathMatch: 'full' },
  { path: 'Person/:id', component: PersonComponent },
  { path: 'add', component: PersonAddEditComponent },
  { path: 'Person/edit/:id', component: PersonAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
