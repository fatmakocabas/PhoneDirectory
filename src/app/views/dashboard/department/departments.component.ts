import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewChild
} from "@angular/core";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { ThemeService } from "app/shared/services/theme.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Department } from "app/shared/models/department.model";
import { DepartmentService } from "app/shared/services/department.service";

@Component({
  selector: "app-departments",
  templateUrl: "./departments.component.html",
  styleUrls: ["./departments.component.scss"],
  animations: matxAnimations
})
export class DepartmentsComponent implements OnInit, AfterViewInit {
  
  departments:Department[]=[];
  displayedColumns: string[] = ['name', 'description', 'address.name' , 'order','action'];
  dataSource:MatTableDataSource<Department> = new MatTableDataSource<Department>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString = '';

  constructor(private themeService: ThemeService, private departmentService: DepartmentService) {}

  ngAfterViewInit() {}
  ngOnInit() {
  
    this.departmentService.allDepartments().subscribe(
      (success) =>{       
        this.departments = success;
        this.dataSource = new MatTableDataSource<Department>(this.departments);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'address.name':
              return this.getTurkishSortableString(item.address.physicalAdress);
            default:
              return this.getTurkishSortableString(item[property]);
          }
        };
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
       
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
}
