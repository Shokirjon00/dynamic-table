import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { OutsideClickDirective } from "../../core/outside-click.directive";
import { FilterComponent } from "../filter/filter.component";
import {DataRow} from "../interface/data";

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule, FormsModule, PaginationComponent, OutsideClickDirective, FilterComponent, NgOptimizedImage]
})
export class TableComponent implements OnChanges, OnInit {
  @Input() data: DataRow[] = [];
  filteredData: DataRow[] = [];
  allColumns: (keyof DataRow)[] = ['_id', 'isActive', 'balance', 'picture', 'age', 'name', 'company', 'email', 'address', 'tags', 'favoriteFruit'];
  columnsToShow: (keyof DataRow)[] = [...this.allColumns];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchText: string = '';
  dropdownVisible: boolean = false;
  private sortColumnName: keyof DataRow | null = null;
  private sortDirection: 'asc' | 'desc' = 'asc';
  columnVisibility: { [key in keyof DataRow]?: { visible: boolean, index: number } } = {};
  columnWidths: { [key: string]: string } = {
    '_id': '220px',
    'email': '200px',
    'address': '200px',
    'tags': '120px',
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentPage = +params['page'] || 1;
      this.itemsPerPage = +params['itemsPerPage'] || 10;
      this.searchText = params['search'] || '';
      const columnsFromRoute = params['columns'] ? (params['columns'].split(',') as (keyof DataRow)[]) : [];
      this.initializeColumns(columnsFromRoute);
      this.applyFilter();
    });
  }

  ngOnChanges() {
    this.initializeColumns();
    this.applyFilter();
  }

  initializeColumns(initialColumns: (keyof DataRow)[] = []) {
    this.columnsToShow = initialColumns.length > 0 ? [...initialColumns] : [...this.allColumns];
    this.columnVisibility = {};
    this.allColumns.forEach((column, index) => {
      this.columnVisibility[column] = { visible: this.columnsToShow.includes(column), index };
    });
  }

  applyFilter() {
    this.filteredData = this.data.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
    this.sortData();
  }

  onFilterChanged(searchText: string) {
    this.searchText = searchText;
    this.applyFilter();
  }

  sortColumn(column: keyof DataRow): void {
    if (this.sortColumnName === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumnName = column;
      this.sortDirection = 'asc';
    }
    this.sortData();
  }

  isNestedColumn(column: keyof DataRow): boolean {
    const value = this.data[0][column];
    return typeof value === 'object' && !Array.isArray(value) && value !== null;
  }

  toggleColumn(column: keyof DataRow): void {
    const visibility = this.columnVisibility[column];
    if (visibility) {
      if (visibility.visible) {
        this.columnsToShow = this.columnsToShow.filter(c => c !== column);
        visibility.visible = false;
      } else {
        const index = visibility.index;
        this.columnsToShow.splice(index, 0, column);
        visibility.visible = true;
        this.updateColumnIndices();
      }
      this.updateRoute();
    }
  }

  updateColumnIndices(): void {
    this.columnsToShow.forEach((column, index) => {
      const visibility = this.columnVisibility[column];
      if (visibility) {
        visibility.index = index;
      }
    });
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateRoute();
  }

  onItemsPerPageChange(items: number): void {
    this.itemsPerPage = items;
    this.currentPage = 1;
    this.updateRoute();
  }

  getColumnWidth(column: keyof DataRow): string {
    return this.columnWidths[column] || '100px';
  }

  handleOutsideClick() {
    this.dropdownVisible = false;
  }

  private sortData(): void {
    if (this.sortColumnName) {
      this.filteredData.sort((a: DataRow, b: DataRow) => {
        const valueA = a[this.sortColumnName!];
        const valueB = b[this.sortColumnName!];
        const direction = this.sortDirection === 'asc' ? 1 : -1;

        if (valueA === undefined) {
          return valueB === undefined ? 0 : -direction;
        }
        if (valueB === undefined) {
          return direction;
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return (valueA - valueB) * direction;
        } else {
          return valueA.toString().localeCompare(valueB.toString()) * direction;
        }
      });
    }
  }

  private updateRoute(): void {
    const visibleColumns = this.columnsToShow.join(',');
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        search: this.searchText || null,
        columns: visibleColumns
      },
      queryParamsHandling: 'merge'
    }).catch();
  }

  protected readonly Array = Array;
}
