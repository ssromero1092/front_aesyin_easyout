import { Menu } from './../../../interfaces/menu';
import { MenuService } from './../../../services/menu.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mobileQuery: MediaQueryList;
  menu: Menu[] = [];
  private _mobileQueryListener: () => void;
  constructor(
    public userService: UsersService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private _menuService: MenuService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  shouldRun = true;
  ngOnInit(){
    this.cargarMenu();
  }
  cargarMenu(){
    this._menuService.getMenu().subscribe(data => {
      this.menu = data;

    })
  }
  logout(){
    this.userService.removeToken();
    //sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
