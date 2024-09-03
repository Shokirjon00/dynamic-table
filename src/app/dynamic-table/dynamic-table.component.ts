import { Component } from '@angular/core';
import { TableComponent } from "./table/table.component";
import { DataService } from "./service/data.service";
import { DataRow } from "./interface/data";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { finalize } from "rxjs";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "../shared/loader/loader.component";
import { FilterComponent } from "../shared/filter/filter.component";


@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    FilterComponent,
    TableComponent,
    LoaderComponent,
    CommonModule
  ],
  providers: [DataService],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent {
  datatable: DataRow[] = [];
  isLoading: boolean = true;

  constructor(private dataService: DataService) {
    this.getData();
  }

  private getData(): void {
    this.isLoading = true
    this.dataService.getData()
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntilDestroyed()
      )
      .subscribe((res: DataRow[] | any) => this.datatable = res);
  }
}
