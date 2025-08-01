import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.html',
  styleUrls: ['./comment.css']
})
export class Comment {
  @Input() comments: { user: User, comment: string, createdAt: string }[] = [];
  @Input() newComment: string = '';
  @Output() newCommentChange = new EventEmitter<string>();
  @Output() addComment = new EventEmitter<void>();

  onCommentChange(value: string) {
    this.newCommentChange.emit(value);
  }

  onAddComment() {
    this.addComment.emit();
  }
}
