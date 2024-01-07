import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ListingRecord } from '../management-view/management-view.component';
import { MatTableModule } from '@angular/material/table';

const PLACEHOLDER_DATA: ListingRecord[] = [];

@Component({
  selector: 'app-entry-list',
  standalone: true,
  imports: [SpinnerComponent, MatTableModule],
  templateUrl: './entry-list.component.html',
  styleUrl: './entry-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryListComponent implements OnChanges {
  @Input() entries?: ListingRecord[];
  @Input() name_header: string = 'name';

  @Output() selectionEmitter = new EventEmitter<number>();

  displayedColumns: string[] = [ 'name', 'id'];
  dataSource = PLACEHOLDER_DATA;
  ngOnChanges(): void {
    if (this.entries) {
      this.dataSource = this.entries;
    }
  }
  clicked(id: number):void {
    this.selectionEmitter.emit(id);
  }
}
