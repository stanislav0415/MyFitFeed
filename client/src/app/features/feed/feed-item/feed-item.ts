import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../models';

@Component({
  selector: 'app-feed-item',
  imports: [],
  templateUrl: './feed-item.html',
  styleUrl: './feed-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedItem {
 @Input() post!: Post;
  @Output() postChangedEvent = new EventEmitter<Post>();
}
