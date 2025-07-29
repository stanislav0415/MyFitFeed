import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedItem } from './feed-item';

describe('FeedItem', () => {
  let component: FeedItem;
  let fixture: ComponentFixture<FeedItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
