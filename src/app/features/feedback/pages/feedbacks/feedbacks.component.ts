import { Component, OnInit, inject, signal } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { FeedbackService } from '../../services/feedback.service';
import { IFeedback } from '../../models/feedback.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feedbacks',
  imports: [NgIf, NgFor, AsyncPipe, DatePipe],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css',
  standalone: true
})
export class FeedbacksComponent implements OnInit {
  private feedbackService = inject(FeedbackService);
  feedbacks$!: Observable<IFeedback[]>;
  vazio: boolean = false;

  ngOnInit(): void {
    this.getAllFeedbacks();
  }

  getAllFeedbacks(): void {
    this.feedbacks$ = this.feedbackService.getAllFeedBacks();
    this.feedbacks$.subscribe({
      next: (res: IFeedback[]) => {
        this.vazio = res.length === 0;
      },
      error: (err: any) => {
        console.error('Erro ao buscar feedbacks:', err);
        this.vazio = true;
      }
    });
  }
}