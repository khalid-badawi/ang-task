import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private draggedIndexSubject = new BehaviorSubject<number>(-1);
  draggedIndex$ = this.draggedIndexSubject.asObservable();

  setDraggedIndex(index: number) {
    this.draggedIndexSubject.next(index);
  }

  getDraggedIndex() {
    return this.draggedIndexSubject.value;
  }
}