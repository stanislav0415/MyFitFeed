import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedBoard } from './feed-board';

describe('FeedBoard', () => {
  let component: FeedBoard;
  let fixture: ComponentFixture<FeedBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
