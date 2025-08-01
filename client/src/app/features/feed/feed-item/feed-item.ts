import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { Post } from '../../../models';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-feed-item',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './feed-item.html',
  styleUrl: './feed-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedItem {
  @Input() post!: Post;
  @Output() postChangedEvent = new EventEmitter<Post>();

  constructor(private authService: AuthService) {}

 
}
