import {Component} from '@angular/core';
import {FilterComponent} from "./filter/filter.component";
import {TableComponent} from "./table/table.component";
import {DataService} from "./service/data.service";
import {DataRow} from "./interface/data";
import {take} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    FilterComponent,
    TableComponent
  ],
  providers: [DataService],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent {
  datatable: DataRow[] = [];

  constructor(private dataService: DataService) {
    this.getData();
  }

  private getData(): void {
    this.dataService.getData()
      .pipe(takeUntilDestroyed())
      .subscribe((res: any) => {
        this.datatable = res;
      });
  }
}
