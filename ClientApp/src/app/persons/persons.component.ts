import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonService } from '../services/Person.service';
import { Person } from '../models/Person';



@Component({
  selector: 'app-Persons',
  templateUrl: './Persons.component.html',
  styleUrls: ['./Persons.component.scss']
})
export class PersonsComponent implements OnInit {
  persons$: Observable<Person[]>;

  constructor(private personService: PersonService) {
  }

  ngOnInit() {
    this.loadPersons();
  }

  loadPersons() {
    this.persons$ = this.personService.getPersons();
  }

  delete(idNumber) {
    const ans = confirm('האם למחוק  : ' + idNumber);
    if (ans) {
      this.personService.deletePerson(idNumber).subscribe((data) => {
        this.loadPersons();
      });
    }
  }
}
