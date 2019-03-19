import {Component, Inject, Input, OnInit} from '@angular/core';
import {Task} from '../models/task.models';
import {TaskService} from '../task.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'aft-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  dialogTitle = 'New Task';
  task: Task = {title: ''};

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private taskService: TaskService) {
  }

  ngOnInit() {
    if (this.data !== null) {
      this.dialogTitle = 'Update Task';
      this.task = this.data.task;
    }
  }

  onSave() {
    const operation: Promise<void> =
      (!this.data)
        ? this.taskService.create(this.task) :
        this.taskService.update(this.task);

    operation
      .then(() => {
          this.dialogRef.close();
        }
      );
  }


}
