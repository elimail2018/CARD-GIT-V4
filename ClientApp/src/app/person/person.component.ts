import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonService } from '../services/Person.service';
import { Person } from '../models/Person';

@Component({
  selector: 'app-Person',
  templateUrl: './Person.component.html',
  styleUrls: ['./Person.component.scss']
})
export class PersonComponent implements OnInit {
  person$: Observable<Person>;
  idNumber: number;

  constructor(private personService: PersonService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.idNumber = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadPerson();
  }

  loadPerson() {
    this.person$ = this.personService.getPerson(this.idNumber);
  }
}
