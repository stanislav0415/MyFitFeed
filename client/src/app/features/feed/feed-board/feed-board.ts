import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Post } from '../../../models';
import { PostService } from '../../../core/services/post.service';
import { FeedItem } from '../feed-item/feed-item';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule,FeedItem ],
  templateUrl: './feed-board.html',
})
export class FeedBoard {
  private postService = inject(PostService);

  posts$: Observable<Post[]> = this.postService.getPosts();
}
