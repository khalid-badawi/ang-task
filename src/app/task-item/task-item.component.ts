import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../data.service';
@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule,FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  constructor(private dataService: DataService) {}


  @Input() task!: { description: string, status: string };
  @Input() index!: number;
  @Output() statusChange = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() drag = new EventEmitter<{ currentIndex: number, previousIndex: number }>();
  faTrash = faTrash;
  faHand = faHand;

  onStatusChange() {
    this.statusChange.emit(this.index);
  }

  onDelete() {
    this.delete.emit(this.index);
  }

  onDragStart(event: DragEvent) {
    this.dataService.setDraggedIndex(this.index);
    
    console.log(this.index);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    let draggedIndex = this.dataService.getDraggedIndex();

    console.log(draggedIndex,this.index);
    if(draggedIndex!==this.index){

      this.drag.emit({ currentIndex: this.index, previousIndex: Number(draggedIndex) }); 
      this.dataService.setDraggedIndex(this.index);
    }

    }
  

  
}

