import { CommonModule,NgFor} from '@angular/common';
import { ChangeDetectionStrategy,ChangeDetectorRef ,Component} from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-saved-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-tasks.component.html',
  styleUrl: './saved-tasks.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedTasksComponent {
  savedtasks$: Observable<any[]>;
  sindex:number=0;
  rindex:number=1;
constructor(private service:ServiceService,private cdr:ChangeDetectorRef)
{
  this.savedtasks$=this.service.tasks$;
 this.updateTasks();
}
deltask(index:string)
{
this.service.del(index)
this.updateTasks();
}
 mark(index:string)
{
   this.service.markline(index);
 this.updateTasks();
}
updateTasks() {
  //this.savedtasks$ = this.service.Tasks;
  this.cdr.markForCheck();
  this.savedtasks$.subscribe(tasks => {
    this.sindex = tasks.filter(t => !t.active).length;
    this.rindex=tasks.filter(t=>t.active).length;
});
}
}
