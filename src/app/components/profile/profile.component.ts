import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private viewportScroller: ViewportScroller, private router: Router) {}

  scrollTo(section: string) {
    this.viewportScroller.scrollToAnchor(section);
  }

  goToGithub() {
    window.open('https://github.com/tyang146?tab=repositories', '_blank');
  }

  goToMyWorld() {
    window.open('https://myworld-a998d.firebaseapp.com/', '_blank');
  }
}
