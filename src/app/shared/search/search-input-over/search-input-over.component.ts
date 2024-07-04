import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
  ViewChildren
} from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { SearchService } from "../search.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AutoFocusDirective } from "app/shared/directives/auto-focus.directive";

@Component({
  selector: "matx-search-input-over",
  templateUrl: "./search-input-over.component.html",
  styleUrls: ["./search-input-over.component.scss"]
})
export class SearchInputOverComponent implements OnInit, OnDestroy {
  @ViewChildren(AutoFocusDirective) searchInput;
  @Input('resultPage') resultPage: string;
  @Input('placeholder') placeholder: string = "Search here";
  @Output("search") search = new EventEmitter<string>();
  searchCtrl = new UntypedFormControl();
  searchCtrlSub: Subscription;

  constructor(
      private searchService: SearchService,
      private router: Router,
      private snackbar: MatSnackBar // MatSnackBar ekledik
  ) {}

  ngOnInit() {
    this.searchCtrlSub = this.searchCtrl.valueChanges.pipe(debounceTime(200)).subscribe();
  }

  ngOnDestroy() {
    if (this.searchCtrlSub) {
      this.searchCtrlSub.unsubscribe();
    }
  }

  open() {
    this.navigateToResult();
    const value = this.searchCtrl.value;
    this.search.emit(value);
  }

  navigateToResult() {
    if (this.resultPage) {
        this.router.navigateByUrl(this.resultPage);
    }
  }

  close() {
    this.searchCtrl.setValue('');
  }

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = this.searchCtrl.value;
      this.search.emit(value);
    }
  }
}
