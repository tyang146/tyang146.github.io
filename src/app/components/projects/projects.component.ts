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
      name: 'Insurance Admin Portal',
      src: './assets/projects/insurance.jpeg',
      link: 'https://github.com/tyang146/Insurance-Admin-Portal',
    },
    {
      name: 'Accounting and Bookkeeping System',
      src: './assets/projects/bookkeeping.jpeg',
      link: 'https://github.com/tyang146/Bookkeeping',
    },
    {
      name: 'Movie Field Deduction',
      src: './assets/projects/movie.jfif',
      link: 'https://huggingface.co/spaces/tyang146/movie_field_deduction',
    },
    {
      name: 'Bank Management System',
      src: './assets/projects/bank.webp',
      link: 'https://github.com/tyang146/Bank_Management_System',
    },
    {
      name: 'Football Regression Analysis',
      src: './assets/projects/football.png',
      link: 'https://github.com/tyang146/regression_analysis_streamlit',
    },
    {
      name: 'S3 Bucket API',
      src: './assets/projects/s3.jpeg',
      link: 'https://github.com/tyang146/My-S3-Bucket-Api',
    },
    {
      name: 'Ransomware Evolution: Chapter 5',
      src: './assets/projects/ransomware.jfif',
      link: 'https://www.taylorfrancis.com/books/edit/10.1201/9781003469506/ransomware-evolution-mohiuddin-ahmed',
    },
  ];
}
