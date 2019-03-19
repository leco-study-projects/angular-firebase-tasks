import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Task} from '../models/task.models';

@Component({
  selector: 'aft-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  @Output() selectTask = new EventEmitter<Task>();
  @Output() performTask = new EventEmitter<Task>();

  constructor() {
  }

  ngOnInit() {
  }

  executionAction(action: string) {
    this[action].emit(this.task);
  }

}
