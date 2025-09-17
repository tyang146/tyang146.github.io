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

  protected  navItems: string[] = ['About', 'Skills', 'Projects'];

  // Scroll to section on nav link click
  onNavClick(item: string) {
    // Ensure we are on the home route before scrolling to section
    this.router.navigateByUrl('/').then(() => {
      const elementId = item.toLowerCase().replace(' ', '-');
      // Allow DOM to settle after navigation
      setTimeout(() => this.viewportScroller.scrollToAnchor(elementId), 0);
    });

    // Close Bootstrap navbar collapse on mobile
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      (navbarCollapse as any).classList.remove('show');
      (navbarCollapse as any).classList.add('collapsing');
      setTimeout(() => {
        (navbarCollapse as any).classList.remove('collapsing');
        (navbarCollapse as any).classList.add('collapse');
      }, 350);
    }
  }
}
