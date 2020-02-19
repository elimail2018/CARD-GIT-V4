import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from '../models/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Persons/';
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getPerson(idNumber: number): Observable<Person> {
    return this.http.get<Person>(this.myAppUrl + this.myApiUrl + idNumber)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  savePerson(Person): Observable<Person> {
    return this.http.post<Person>(this.myAppUrl + this.myApiUrl, JSON.stringify(Person), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updatePerson(idNumber: number, Person): Observable<Person> {
    return this.http.put<Person>(this.myAppUrl + this.myApiUrl + idNumber, JSON.stringify(Person), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deletePerson(idNumber: number): Observable<Person> {
    return this.http.delete<Person>(this.myAppUrl + this.myApiUrl + idNumber)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
   let errorMessage = '';
    let full_details = error.error;
    let server_errors ;
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
     
    } else {
      server_errors = error.error.errors;//server validation errors
      

      if (server_errors) {

        // Get server-side error // extract server error details
        let name_details = server_errors.Name ? server_errors.Name[0] : '';
        let id_details = server_errors.IdNumber ? server_errors.IdNumber[0] : '';
        let email_details = server_errors.Email ? server_errors.Email[0] : '';
        let phone_details = server_errors.Phone ? server_errors.Phone[0] : '';
        let birthdate_details = server_errors.BirthDate ? server_errors.BirthDate[0] : '';
        /// ...
        /// ...
        full_details = " שגיאת וליציה שרת : \n"
          + name_details + ",\n"
          + id_details + ",\n "
          + email_details + ",\n "
          + phone_details + ",\n"
          + birthdate_details;




      }
      

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message} ${full_details}\n `;

    }

 
    console.log(error.error);
    //console.log(server_errors); //a little debugging 
    return throwError(full_details || ' שגיאת שרת');
  }
}
