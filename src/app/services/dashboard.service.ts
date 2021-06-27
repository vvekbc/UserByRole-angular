import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class DashboardService {
  public meetingInfo = new Subject<any>();

  constructor(  private httpClient: HttpClient,
  ) { }


  getAllUsers(params) {
    return this.httpClient.get(
      'http://localhost:3000/user',  { 'headers': { 'Content-Type': 'application/json' } }
    );
  }
  getAllRoles(params) {
    return this.httpClient.get(
      'http://localhost:3000/roles',  { 'headers': { 'Content-Type': 'application/json' } }
    );
  }

  
  getUsersByRole(params) {
    return this.httpClient.get(
      'http://localhost:3000/user/roles/'+params.roleId+"?pageNo="+params.pageNo+"&maxRows="+params.maxRows,  { 'headers': { 'Content-Type': 'application/json' } }
    );
  }
}
