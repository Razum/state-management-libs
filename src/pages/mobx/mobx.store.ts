import { action, observable, makeObservable } from 'mobx';

import type { TaskType, TaskDataType } from './mobx.types';

import { initialTasks } from './mobx.data';

class Tasks {
  tasks: TaskType[] = initialTasks;

  constructor() {
    makeObservable(this, {
      tasks: observable,
      addTask: action,
      removeTask: action,
      updateTask: action
    });
  }

  addTask(task: TaskDataType) {
    this.tasks.push({ ...task, id: crypto.randomUUID() });
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTask(updatedTask: TaskType) {
    this.tasks = this.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
  }
}

export default new Tasks();
