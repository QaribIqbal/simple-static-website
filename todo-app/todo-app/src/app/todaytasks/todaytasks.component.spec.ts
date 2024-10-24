import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaytasksComponent } from './todaytasks.component';

describe('TodaytasksComponent', () => {
  let component: TodaytasksComponent;
  let fixture: ComponentFixture<TodaytasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaytasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaytasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
