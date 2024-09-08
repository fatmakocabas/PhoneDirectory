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
import { SectionService } from "app/shared/services/section.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { Section } from "app/shared/models/section.model";

@Component({
  selector: "app-sections",
  templateUrl: "./sections.component.html",
  styleUrls: ["./sections.component.scss"],
  animations: matxAnimations
})
export class SectionsComponent implements OnInit, AfterViewInit {

  sections: Section[] = [];
  displayedColumns: string[] = ['name', 'description', 'department.name', 'order', 'action'];
  dataSource: MatTableDataSource<Section> = new MatTableDataSource<Section>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchInput: string = '';

  constructor(
    private sectionService: SectionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchSections();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchSections() {
    this.sectionService.getAllSections().subscribe(
      (sections) => {
        this.sections = sections;
        this.dataSource.data = this.sections;
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'department.name':
              return item.department?.name ? this.getTurkishSortableString(item.department.name) : ''; // Müdürlük adını sıralama
            default:
              return this.getTurkishSortableString(item[property]);
          }
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.snackBar.open('Error fetching sections', 'Close', { duration: 3000 });
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
  applyFilter() {
    this.dataSource.filter = this.searchInput.trim().toLowerCase();
  }

  deleteSection(sectionId: string) {
    if (confirm('Are you sure you want to delete this section?')) {
      this.sectionService.deleteSection(sectionId).subscribe(
        () => {
          this.snackBar.open('Section deleted successfully', 'Close', { duration: 3000 });
          this.fetchSections();
        },
        (error) => {
          this.snackBar.open('Error deleting section', 'Close', { duration: 3000 });
        }
      );
    }
  }

}
