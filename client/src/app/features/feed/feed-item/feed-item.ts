import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { Post } from '../../../models';

@Component({
  selector: 'app-feed-item',
  imports: [CommonModule, DatePipe,RouterModule],
  templateUrl: './feed-item.html',
  styleUrl: './feed-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedItem {
 @Input() post!: Post;
  @Output() postChangedEvent = new EventEmitter<Post>();
}


