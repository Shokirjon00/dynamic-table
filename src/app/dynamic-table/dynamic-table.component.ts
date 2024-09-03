import { Component, OnInit } from '@angular/core';
import { TableComponent } from "./table/table.component";
import { DataService } from "./service/data.service";
import { DataRow } from "./interface/data";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { delay, finalize } from "rxjs";
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
export class DynamicTableComponent implements OnInit {
  datatable: DataRow[];
  isLoading: boolean;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.isLoading = true;
    this.dataService.getData()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe((res: DataRow[] | any) => {
        this.datatable = res;
      });
  }
}
