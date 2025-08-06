import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment.html',
})
export class Comment {
  @Input() comments: any[] = [];
  @Input() currentUser: any = null;
  @Input() editedComment: { _id: string; comment: string } | null = null;
  @Input() newComment: string = '';

  @Output() addComment = new EventEmitter<void>();
  @Output() deleteComment = new EventEmitter<string>();
  @Output() editCommentStart = new EventEmitter<any>();
  @Output() editCommentCancel = new EventEmitter<void>();
  @Output() editCommentSave = new EventEmitter<void>();
  @Output() newCommentChange = new EventEmitter<string>();

  onAddComment() {
    this.addComment.emit();
  }

  onDeleteComment(id: string) {
    this.deleteComment.emit(id);
  }

  onStartEdit(comment: any) {
    this.editCommentStart.emit(comment);
  }

  onCancelEdit() {
    this.editCommentCancel.emit();
  }

  onSaveEditedComment() {
    this.editCommentSave.emit();
  }

  onNewCommentChange(value: string) {
    this.newCommentChange.emit(value);
  }
}
