import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DashboardService } from './services/dashboard.service';


// export interface TableElement {
//   _id: string;
//   position: string;
//   role_id: string;
//   user_id: string;


//   created_at: "2016-02-02T17:47:10.000Z"
// fname: "Yvonne"
// lname: "Lambert"
// }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Users-By-Role-Frontend';
  usersList: any;
  maxRows: number = 10;
  noOfRows = [5, 10, 20]
  availableRoles: any;
  selectedRoleId: string = 'All';
  currentPage: number = 1
  pageEvent: PageEvent;
  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['fname', 'created_at','_id', 'user_id','role_id'];
  totalRecords:number=0;

  constructor(private dashboardService: DashboardService) {

  }
  ngOnInit(): void {
    this.getAllRoles();
    // this.getAllUsers();
    this.selectedRoleId="All"
    this.getUsersByRole();
  }

  getAllRoles() {
    this.dashboardService.getAllRoles({}).subscribe((response: any) => {
      console.log("response", response)
      if (response.status == 'success') {
        this.availableRoles = response.rolesList;//[ ...this.availableRoles, ...response.rolesList ]
        // Array.prototype.push.apply(this.availableRoles,response.rolesList); 

        // this.availableRoles.push(0,{_id:"","created_at":"","name":"All"})
        console.log("this.availableRoles", this.availableRoles)
      }
    })
  }
  getAllUsers() {
    this.dashboardService.getAllUsers({}).subscribe((response: any) => {
      console.log("response", response)
      if (response.status == 'success') {
        this.usersList = response.usersList
      }
    })
  }

  getUsersByRole(){
    var params = {
      "roleId": this.selectedRoleId,
      "pageNo": this.currentPage,
      "maxRows": this.maxRows
    }
    this.dashboardService.getUsersByRole(params).subscribe((response: any) => {
      console.log("response", response)
      if (response.status == 'success') {
        this.usersList = response.usersList
        this.totalRecords=response.totalRecords
      }
    });
  }
  onRoleSelected(value) {
    console.log("Value", value, this.selectedRoleId);
   
    this.getUsersByRole();

  }

  onChangeMaxRows(maxRows) {
    this.currentPage = 1;
    this.getUsersByRole();   
  }
  public getServerData(event?:PageEvent){
  console.log("event",event)
  
    if(this.maxRows!= event.pageSize){
    this.maxRows=event.pageSize
    this.currentPage=1;
    this.paginator.pageIndex = 0;
    }else{
      this.currentPage=event.pageIndex+1;

    }
    this.getUsersByRole(); 
      return event;
  }
}


