import { Component, Input } from '@angular/core';
import { NgForOf } from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  loading: boolean = true;

}
