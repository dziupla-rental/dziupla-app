import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ListingRecord } from '../management-view/management-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const PLACEHOLDER_DATA: ListingRecord[] = [];

@Component({
  selector: 'app-entry-list',
  standalone: true,
  imports: [SpinnerComponent, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './entry-list.component.html',
  styleUrl: './entry-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryListComponent implements OnChanges {
  @Input() entries?: ListingRecord[];
  @Input() name_header: string = 'name';

  @Output() selectionEmitter = new EventEmitter<number>();
  @Output() creationEmitter = new EventEmitter<void>();

  displayedColumns: string[] = ['name', 'id'];
  dataSource = PLACEHOLDER_DATA;
  ngOnChanges(): void {
    if (this.entries) {
      this.dataSource = this.entries;
    }
  }
  clicked(id: number): void {
    this.selectionEmitter.emit(id);
  }
  addEntry(): void {
    console.log('adding entry!');
    this.creationEmitter.emit();
  }
}
