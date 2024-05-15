import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskItemComponent } from './task-item/task-item.component';
import { CommonModule, NgFor } from '@angular/common';
import { ReactiveFormsModule,FormGroup,FormControl, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TaskItemComponent,ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "Task2";
  taskForm = new FormGroup({
    description: new FormControl(''),
  });
  tasks: { description: string, status: string }[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');

  filteredTasks: { description: string, status: string }[] = this.tasks;
  selectedFilter: 'all' | 'pending' | 'completed' = 'all';


  addTask() {
    let descriptionValue = this.taskForm.get('description')?.value;
    if (descriptionValue && descriptionValue.trim() !== '') {
      this.tasks.push({ description: descriptionValue, status: 'pending' });
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.filterTasks();
      this.taskForm.reset();
    }
  }

  selectFilter(filter: 'all' | 'pending' | 'completed') {
    this.selectedFilter = filter;
    this.filterTasks();
  }

  filterTasks() {
    if (this.selectedFilter === 'all') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === this.selectedFilter);
    }
  }

  onStatusChange(index: number) {
    this.tasks[index].status = this.tasks[index].status === 'pending' ? 'completed' : 'pending';
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.filterTasks();
  }

  onDelete(index: number) {
    this.tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.filterTasks();
  }

  onDrag(event: { currentIndex: number, previousIndex: number }) {
    const movedTask = this.tasks.splice(event.previousIndex, 1)[0];
    this.tasks.splice(event.currentIndex, 0, movedTask);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    console.log(this.tasks);
    this.filterTasks();
  }

  clearAll() {
    if (confirm('Are you sure you want to delete all tasks?')) {
      this.tasks = [];
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.filterTasks();
    }
  }

}
