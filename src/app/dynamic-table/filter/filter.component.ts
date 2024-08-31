import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  searchText: string = '';
  @Output() filterChanged = new EventEmitter<string>();
  private searchTimeout: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchText = params['search'] || '';
      this.searchText = this.searchText.trim();
      this.filterChanged.emit(this.searchText);
    });
  }

  onSearchTextChange() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchText = this.searchText.trim();
      this.filterChanged.emit(this.searchText);
      this.updateRoute();
    }, 2000);
  }

  onEnterPress() {
    clearTimeout(this.searchTimeout);
    this.searchText = this.searchText.trim();
    this.filterChanged.emit(this.searchText);
    this.updateRoute();
  }

  clearSearchText() {
    this.searchText = '';
    this.filterChanged.emit(this.searchText);
    this.updateRoute();
  }

  updateRoute() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchText || null,
      },
      queryParamsHandling: 'merge',
    }).catch();
  }
}
