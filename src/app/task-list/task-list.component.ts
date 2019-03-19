import {Component, OnInit} from '@angular/core';

import {Task} from '../models/task.models';
import {TaskService} from '../task.service';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {TaskDialogComponent} from '../task-dialog/task-dialog.component';
import {take} from 'rxjs/operators';

@Component({
  selector: 'aft-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  selectedTask: Task;

  tasks$: Observable<Task[]>;

  loading: boolean;

  constructor(private dialog: MatDialog,
              private taskService: TaskService) {
  }

  ngOnInit() {
    this.tasks$ = this.taskService.tasks.valueChanges();

    this
      .tasks$
      .pipe(take(1))
      .subscribe(() => this.loading = false);
  }

  onPerformTask(task: Task) {
    task.done = !task.done;
    return this.taskService.update(task);
  }

  showDialog(task?: Task) {
    const config: MatDialogConfig<any> = (task) ? {data: {task}} : null;
    this.dialog.open(TaskDialogComponent, config);
  }

  deleteTask(task: Task) {
    return this.taskService.delete(task);
  }
}
