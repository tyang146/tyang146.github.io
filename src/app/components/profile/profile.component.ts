import {Component} from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  goToGithub() {
    window.open('https://github.com/tyang146?tab=repositories', '_blank');
  }

  goToMyWorld() {
    window.open('https://myworld-a998d.firebaseapp.com/', '_blank');
  }

  goToMyCertificate() {
    window.open('https://www.freecodecamp.org/certification/fcc-36cb9c7f-cd9a-45a5-bd66-10bfcac46281/foundational-c-sharp-with-microsoft', '_blank');
  }
}
