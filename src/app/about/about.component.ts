import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule, FeedbackComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
