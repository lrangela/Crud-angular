import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIndexPostComponent } from './view-index-post.component';

describe('ViewIndexPostComponent', () => {
  let component: ViewIndexPostComponent;
  let fixture: ComponentFixture<ViewIndexPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIndexPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewIndexPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
