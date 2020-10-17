import { Component } from '@angular/core';
import { ServiceimplService } from './serviceimpl.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-crud';
  allUser: Object;
  userObj = {
    name: '',
    mobileno: '',
    email: '',
    password: '',
  }
  isEdit: boolean = false;
  showMsg: boolean = false;

  constructor(private service: ServiceimplService){  }
  ngOnInit(){
    console.log('Inside init');
    this.getCurrentUsr();
  }

  submitHandler(form: any): void{
    console.log(form.name);
    console.log(form.mobileno);
    console.log(form.email);
    console.log(form.password);
    this.service.createUser(form).subscribe((res) => {
      this.getCurrentUsr();
      this.showMsg = true;
    });
  }

  getCurrentUsr() {
    console.log('Inside getCurrentUsr');
   return this.service.getAllUser().subscribe((res) => {
     this.allUser = res;
   });
  }

  editUser(user){
    console.log('Edit clicker' +user.id);
    this.isEdit = true;
    this.userObj = user;
   
  }
  deleteUser(user: any){
    console.log('Delete clicker: ' +user.id);
      this.service.deleteUser(user).subscribe(() => {
      this.getCurrentUsr();
    });

  }
  updateUser(){
    this.isEdit = !this.isEdit;
    this.service.updateUser(this.userObj).subscribe( (res) =>{
      this.getCurrentUsr();
    })
  }

}
