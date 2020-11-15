import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public Islogin: boolean = false;
  loggedId: string ="";


  loginControl(id,pass){

    if(id=="1" && pass == "1234"){
      this.Islogin = true;
      this.loggedId = id;

    }
    else{
      this.Islogin=false;
      this.loggedId="";
    }
  }

  LogoGallery = [
    {imgSrc: '../../assets/img/logos/autodesk.png'},
    {imgSrc: '../../assets/img/logos/autodeskforge.png'},
    {imgSrc: '../../assets/img/logos/codeo.png'}
    ];

}
