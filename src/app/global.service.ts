import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  menu: boolean = true
  activeTab: any = sessionStorage.getItem('adminActiveTab') ? sessionStorage.getItem('adminActiveTab') : 'dashboard';
  
  basepath = "http://127.0.0.1:8000/api"

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token')
  }

  // no headers
  post(url: any, req: any) {
    return this.http.post(url, req)
  }

  // no headers
  get(url: any) {
    return this.http.get(url)
  }

  // postUnauthenticateData(url: any, req: any) {
  //   return this.http.post(url, req)
  // }

}
