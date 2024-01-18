import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewChild
} from "@angular/core";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { ThemeService } from "app/shared/services/theme.service";
import tinyColor from "tinycolor2";
import PerfectScrollbar from "perfect-scrollbar";
import { PersonalService } from "app/shared/services/personal.service";
import { Personal } from "app/shared/models/personal.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-personals",
  templateUrl: "./personals.component.html",
  styleUrls: ["./personals.component.scss"],
  animations: matxAnimations
})
export class PersonalsComponent implements OnInit, AfterViewInit {



  personals: Personal[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'department.name', 'section.name', 'order', 'isActive', 'action',];
  dataSource: MatTableDataSource<Personal> = new MatTableDataSource<Personal>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString = '';

  constructor(private themeService: ThemeService, private personalService: PersonalService) { }

  ngAfterViewInit() { }
  ngOnInit() {
    this.personalService.allPersonels().subscribe(
      (success) => {
        this.personals = success;

        this.dataSource = new MatTableDataSource<Personal>(this.personals);

        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'department.name':
              return this.getTurkishSortableString(item.department && item.department.name ? item.department.name : '');
            case 'dateOfBirth':
              return new Date(item.dateOfBirth);
            // Diğer sütunlarda gerekirse ekleyebilirsiniz
            case 'firstName':
            case 'lastName':
            //case 'title':
            case 'email':
            case 'mobile':
            case 'section.name':
            case 'order':
              return this.getTurkishSortableString(item[property]);
            default:
              return item[property];
          }
        };

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      (error) => {
        console.error("Error occurred:", error);
      }
    );
  }
  getTurkishSortableString(value: string): string {
    if (value && typeof value === 'string') {
      const turkishCharacters = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u' };

      return value
        .toLocaleLowerCase('tr-TR')
        .replace(/[çğıöşü]/g, char => turkishCharacters[char] || char);
    }
    return value;
  }
  searchInput: string = '';
  applyFilter() {
    this.dataSource.filter = this.searchInput.trim().toLowerCase();
  }
}
