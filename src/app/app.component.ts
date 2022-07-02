import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './modules/auth/auth.service';
import { LoaderService } from './services/loader.service';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn: boolean = false;
  username: string = "";
  currentRoute: string = '/home';
  currentLanguage: string = "";

  constructor(public authService: AuthService,
    public loaderService: LoaderService,
    public router: Router,
    private translate: TranslateService)
  {
    translate.setDefaultLang('en');
    translate.use('en');
    this.currentLanguage = "English";

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

  useLanguage(language: string): void {
    this.translate.use(language);
    switch (language) {
      case "en":
        this.currentLanguage = "English";
        break;
      case "ru":
        this.currentLanguage = "Русский";
        break;
    }
  }
}
