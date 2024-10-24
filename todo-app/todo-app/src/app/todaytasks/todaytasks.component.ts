import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todaytasks',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './todaytasks.component.html',
  styleUrls: ['./todaytasks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodaytasksComponent {  // Correct class name
  Today: any;
  savedtasks$: Observable<any[]>;
  sindex: number = 0;
  rindex: number = 1;
  tindex:number=0;

  constructor(private service: ServiceService, private cdr: ChangeDetectorRef) {
    this.Today = new Date().toISOString();
    console.log(this.Today)
    this.savedtasks$ = this.service.tasks$;
    this.updateTasks();
  }

  deltask(index: string) {
    this.service.del(index);
    this.updateTasks();
  }

  mark(index: string) {
    this.service.markline(index);
    this.updateTasks();
  }

  updateTasks() {
    this.cdr.markForCheck();
    this.savedtasks$.subscribe(tasks => {
      this.sindex = tasks.filter(t => !t.active).length;
      this.rindex = tasks.filter(t => t.active).length;
      this.tindex = tasks.filter(t => t.active && this.Today.split('T')[0] === t.date.split('T')[0]).length;
    });
  }
}
