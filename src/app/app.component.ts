import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AboutComponent} from "./components/about/about.component";
import {SkillsComponent} from "./components/skills/skills.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import {FooterComponent} from "./components/footer/footer.component";
import {NgIf} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ProfileComponent, AboutComponent, SkillsComponent, ProjectsComponent, FooterComponent, NgIf],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'portfolio';

  isHomeRoute = true;

  constructor(private router: Router) {
    this.isHomeRoute = this.router.url === '/' || this.router.url === '';
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.isHomeRoute = evt.urlAfterRedirects === '/' || evt.urlAfterRedirects === '';
      }
    });
  }
}
