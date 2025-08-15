import {Component} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [],
  templateUrl: './nav-links.component.html',
  styleUrl: './nav-links.component.scss'
})
export class NavLinksComponent {

  constructor(private viewportScroller: ViewportScroller, private router: Router) {}

  protected  navItems: string[] = ['About', 'Skills', 'Projects', 'Playground'];

  onNavClick(item: string) {
    if (item === 'Playground') {
      this.router.navigateByUrl('/playground');
      return;
    }

    // Ensure we are on the home route before scrolling to anchors
    this.router.navigateByUrl('/').then(() => {
      const elementId = item.toLowerCase().replace(' ', '-');
      // Allow DOM to settle after navigation
      setTimeout(() => this.viewportScroller.scrollToAnchor(elementId), 0);
    });
  }

  scrollTo(section: string) {
    let elementId = section.toLowerCase().replace(' ', '-');
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
