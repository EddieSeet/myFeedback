import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  constructor(

    private adminService: AdminService
  ) { }
  
  ngOnInit() {
    this.adminService.adminData().subscribe(
      data => console.log(data)
    )
  }

}
