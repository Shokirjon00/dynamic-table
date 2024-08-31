import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() itemsPerPageOptions: number[] = [5, 10, 20, 50];

  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  onItemsPerPageChange() {
    this.itemsPerPageChange.emit(this.itemsPerPage);
  }

}
