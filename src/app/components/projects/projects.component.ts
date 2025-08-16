import {Component} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {ProjectItemComponent} from "./project-item/project-item.component";

export interface Project {
  name: string;
  src: string;
  link: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    ProjectItemComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  protected projects: Project[]  = [
    {
      name: 'Bank Management System',
      src: './assets/projects/bank.png',
      link: 'https://github.com/tyang146/Bank-Management-System',
    },
    {
      name: 'Accounting and Bookkeeping System',
      src: './assets/projects/bookkeeping.jpeg',
      link: 'https://github.com/tyang146/Bookkeeping',
    },
    {
      name: 'Workout Tracker',
      src: './assets/projects/wt.png',
      link: 'https://github.com/tyang146/WorkoutTracker',
    },
    {
      name: 'Bloxorz AI',
      src: './assets/projects/Bloxorz.jpg',
      link: 'https://github.com/tyang146/BloxorzAI',
    },
    {
      name: 'Movie Field Deduction',
      src: './assets/projects/movie.jfif',
      link: 'https://github.com/tyang146/movie_field_deduction',
    },
    {
      name: 'Ransomware Evolution: Chapter 5',
      src: './assets/projects/ransomware.jfif',
      link: 'https://www.taylorfrancis.com/books/edit/10.1201/9781003469506/ransomware-evolution-mohiuddin-ahmed',
    },
  ];
}
