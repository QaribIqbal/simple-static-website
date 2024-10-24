import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedTasksComponent } from './saved-tasks.component';

describe('SavedTasksComponent', () => {
  let component: SavedTasksComponent;
  let fixture: ComponentFixture<SavedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
