import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsComponent } from './objects.component';

describe('ObjectsComponent', () => {
  let component: ObjectsComponent;
  let fixture: ComponentFixture<ObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
