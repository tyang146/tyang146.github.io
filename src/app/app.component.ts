import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AboutComponent} from "./components/about/about.component";
import {SkillsComponent} from "./components/skills/skills.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import {NgIf} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ProfileComponent, AboutComponent, SkillsComponent, ProjectsComponent, NgIf],
  templateUrl: './app.component.html'
})
export class AppComponent {
  isHomeRoute = true;

  // Check the current route on initialization and on navigation events
  // If the route is '/' or '', set isHomeRoute to true, otherwise false
  // This will help in conditionally rendering components based on the route
  constructor(private router: Router) {
    this.isHomeRoute = this.router.url === '/' || this.router.url === '';
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.isHomeRoute = evt.urlAfterRedirects === '/' || evt.urlAfterRedirects === '';
      }
    });
  }
}
