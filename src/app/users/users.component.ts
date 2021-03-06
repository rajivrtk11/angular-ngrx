import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { IUser } from '../user';
import { Store, select } from '@ngrx/store';
import * as UserActions from '../user.actions';
import * as fromUser from '../user.selectors';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit{

  pageTitle = 'Users List';
  errorMessage = '';
  users: IUser[] = [];
  userFilter = "";
 
  
  @ViewChild('divElementVar') divElementRef: ElementRef;
  constructor(private store: Store, private _userServices: UserService) { }

  ngAfterViewInit(){
    this.divElementRef.nativeElement.focus();
  }

  ngOnInit(): void {

    this.store.dispatch(new UserActions.LoadUsers()); // action dispatch

    this.store.pipe(select(fromUser.getUsers)).subscribe(
      users => {
        this.users = users;
      }
    )

    this.store.pipe(select(fromUser.getError)).subscribe(
      err => {
        this.errorMessage = err;
      }
    )
    
    this._userServices.getData().subscribe((data) => {
      console.log("the user data is ", data);
    }, err => {
      console.log("the error is ", err);
    })
    
    

  }
}
