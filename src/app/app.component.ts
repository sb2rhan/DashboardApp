import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './modules/auth/auth.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn: boolean = false;
  username: string = "";
  currentRoute: string = '/home';

  constructor(public authService: AuthService,
    public loaderService: LoaderService,
    public router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.url;
        if (!val.url.includes("auth")) {
          this.isLoggedIn = true;
          this.username = authService.getUsername() ?? "";
        } else {
          this.isLoggedIn = false;
        }
      }

    });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
