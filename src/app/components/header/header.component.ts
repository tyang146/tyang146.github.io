import {Component} from '@angular/core';
import {NavLinksComponent} from "../shared/nav-links/nav-links.component";
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavLinksComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigateByUrl('/');
  }

}
