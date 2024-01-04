import { ReplaySubject } from 'rxjs';

export namespace FilterUtils {
  export function filterSelectOptions(
    list: string[],
    searchValue: string,
    filteredOptions: ReplaySubject<string[]>,
    noneValue: string
  ): void {
    if (!list) {
      return;
    }
    // get the search keyword
    let search = searchValue;
    if (!search) {
      filteredOptions.next(
        list
          .sort((first: string, second: string) => {
            if (first === noneValue && second !== noneValue) {
              return -1; // "none" comes before any other value
            } else if (first !== noneValue && second === noneValue) {
              return 1; // Any other value comes after "none"
            } else {
              return first.localeCompare(second); // Sort other values normally
            }
          })
          .slice()
      );
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the options
    filteredOptions.next(
      list.filter((element) => element.toLowerCase().indexOf(search) > -1)
    );
  }
}
