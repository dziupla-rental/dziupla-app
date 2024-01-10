import { Injectable } from '@angular/core';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  /** Keep the current ref to close it */
  private _currentSpinnerRef?: MatDialogRef<SpinnerComponent>;

  /** Amount of elements that called the open method but haven't closed it yet */
  private _queue: number = 0;

  private readonly _toClose: Subject<void> = new Subject<void>();

  private readonly _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly _dialog: MatDialog) {
    this._toClose
      .asObservable()
      .pipe(debounceTime(500), takeUntil(this._destroy$))
      .subscribe(() => {
        //Make sure that after the 500ms there's still no queue
        this._queue == 0 ? this.killSpinner() : null;
      });
  }

  /** @ignore */
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  /**
   * Request a spinner open. If one is already opened the spinner will be held open until the request finishes.
   *
   * @param {string} [from] (FOR DEBUGGING PURPOSES, OPTIONAL): where the spinner has been opened from
   * @memberof SpinnerService
   */
  open(from?: string): void {
    //if it's not open, create one
    this._queue == 0 && this._currentSpinnerRef == undefined
      ? (this._currentSpinnerRef = this._dialog.open(SpinnerComponent, {
          disableClose: true,
        }))
      : null;

    this._queue++;
  }

  /**
   * Request a spinner close. Close only if the queue is empty.
   *
   * @param {string} [from] (FOR DEBUGGING PURPOSES, OPTIONAL): where the spinner has been closed from
   * @memberof SpinnerService
   */
  close(from?: string): void {
    this._queue != 0 ? this._queue-- : null;
    this._queue == 0 ? this._toClose.next() : null;
  }

  /**
   * Close the spinner when not needed
   *
   * @private
   * @memberof SpinnerService
   */
  private killSpinner(): void {
    this._currentSpinnerRef?.close();
    this._currentSpinnerRef = undefined;
  }

  /**
   *
   * @param isFromOpen has the spinner been opened or closed
   * @param source where the spinner has been opened from
   */

  /**
   * Function to print out where the spinner is opened and closed
   *
   * @private
   * @param {boolean} isFromOpen has the spinner been opened or closed
   * @param {string} [source='unknown'] USED FOR DEBUGGING PURPOSES ONLY
   * @memberof SpinnerService
   */
  private logInfoToConsole(
    isFromOpen: boolean,
    source: string = 'unknown'
  ): void {
    isFromOpen
      ? console.log(`Opened from: ${source}, current value: ${this._queue}`)
      : console.log(`Closed from: ${source}, current value: ${this._queue}`);
  }
}
