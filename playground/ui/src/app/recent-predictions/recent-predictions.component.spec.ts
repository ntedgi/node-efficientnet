import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RecentPredictionsComponent } from './recent-predictions.component';
import { LanguagesApiService } from '../languages-api.service';

describe('RecentPredictionsComponent', () => {
  let component: RecentPredictionsComponent;
  let fixture: ComponentFixture<RecentPredictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentPredictionsComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ LanguagesApiService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});