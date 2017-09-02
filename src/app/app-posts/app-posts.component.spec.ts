import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPostsComponent } from './app-posts.component';

describe('AppPostsComponent', () => {
  let component: AppPostsComponent;
  let fixture: ComponentFixture<AppPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
