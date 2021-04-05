import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageuploaderComponent } from './imageuploader.component';

describe('ImageuploaderComponent', () => {
  let component: ImageuploaderComponent;
  let fixture: ComponentFixture<ImageuploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageuploaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageuploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
