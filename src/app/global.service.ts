import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  menu: boolean = true;
  // plan_id: Number = 0;
  activeTab: any = sessionStorage.getItem('adminActiveTab') ? sessionStorage.getItem('adminActiveTab') : 'admin-dashboard';
  actTab: any = sessionStorage.getItem('userActiveTab') ? sessionStorage.getItem('userActiveTab') : 'home';
  basepath = "http://127.0.0.1:8000/api"

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token')
  }

  // no headers
  // post(url: any, req: any) {
  //   return this.http.post(url, req)
  // }

  // no headers
  // get(url: any) {
  //   return this.http.get(url)
  // }

  // postUnauthenticateData(url: any, req: any) {
  //   return this.http.post(url, req)
  // }

  post(url: any, req: any) {
    const headers = new HttpHeaders({
      'X-Client-Mac-Address': 'A8-93-4A-61-3E-63'
    });

    return this.http.post(url, req, { headers });
  }

  // Include MAC address in headers
  get(url: any) {
    const headers = new HttpHeaders({
      'X-Client-Mac-Address': 'A8-93-4A-61-3E-63'
    });

    return this.http.get(url, { headers });
  }

}
