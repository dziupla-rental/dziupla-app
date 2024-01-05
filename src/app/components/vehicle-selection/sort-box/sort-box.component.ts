import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { sortValue } from '../../../model/internal/filter-values';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MATERIALS = [
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  FormsModule,
];

@Component({
  selector: 'app-sort-box',
  standalone: true,
  imports: [CommonModule, MATERIALS],
  templateUrl: './sort-box.component.html',
  styleUrl: './sort-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortBoxComponent implements OnInit {
  @Output() sortChange: EventEmitter<sortValue> = new EventEmitter();

  isAsc: boolean = false;

  options: string[] = ['Typ', 'Ilość miejsc', 'Cena', 'Dostępność'];

  selectedOption: string = this.options[0];

  constructor() {}

  ngOnInit(): void {
    this.emitNewValue();
  }

  onSelectionChange(event: MatSelectChange): void {
    this.selectedOption = event.value as string;
    this.emitNewValue();
  }

  onDirectionChange(): void {
    this.isAsc = !this.isAsc;
    this.emitNewValue();
  }

  private emitNewValue(): void {
    this.sortChange.emit({
      sort: this.selectedOption.toLocaleLowerCase(),
      isAsc: this.isAsc,
    });
  }
}
