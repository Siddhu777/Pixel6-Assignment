import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
postCodeURL = "http://www.postalpincode.in/api/pincode/"
baseURL = "http://localhost:5000/api/"

  constructor(private router:Router,private http:HttpClient) { }
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  getPostcodeDetails(id:number){
    
    return this.http.get(`${this.baseURL}get_postcode_details/${id}`,{headers: this.httpHeaders})
  }
 
  verifyPan(id:any){
    return this.http.get(`${this.baseURL}verify_pan/${id}`,{headers: this.httpHeaders})
  }

  addCustomer(form:any): Observable<any[]>{
    // addCustomer(form:any){
    if(form){
      localStorage.setItem('Customer',JSON.stringify(form))  
    }
     return of(form);
  }

}
