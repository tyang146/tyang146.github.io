import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ButtonState {
  moved: boolean;
  top: number;
  left: number;
}

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {
  buttonStates: ButtonState[] = [];

  constructor() {
    // Generate 5 buttons with random positions
    for (let i = 0; i < 5; i++) {
      this.buttonStates.push({
        moved: false,
        top: Math.random() * 60 + 10,  // 10% to 70% from the top
        left: Math.random() * 60 + 10  // 10% to 70% from the left
      });
    }
  }

  onButtonClick(index: number) {
    this.buttonStates[index].moved = !this.buttonStates[index].moved;
    // Move to a new random location
    this.buttonStates[index].top = Math.random() * 60 + 10;  // 10% to 70%
    this.buttonStates[index].left = Math.random() * 60 + 10; // 10% to 70%
  }
}
