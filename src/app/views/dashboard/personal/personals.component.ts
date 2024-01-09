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

@Component({
  selector: "app-personals",
  templateUrl: "./personals.component.html",
  styleUrls: ["./personals.component.scss"],
  animations: matxAnimations
})
export class PersonalsComponent implements OnInit, AfterViewInit {



  personals:Personal[]=[];
  displayedColumns: string[] = ['firstName', 'lastName', 'title', 'dateOfBirth', 'email', 'mobile', 'department.name','section.name','order','action',];
  dataSource:MatTableDataSource<Personal> = new MatTableDataSource<Personal>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString = '';

  constructor(private themeService: ThemeService, private personalService: PersonalService) {}

  ngAfterViewInit() {}
  ngOnInit() {

    this.personalService.allPersonels().subscribe(
      (success) =>{
       
        this.personals = success;


        this.dataSource = new MatTableDataSource<Personal>(this.personals);

        this.dataSource.sortingDataAccessor = (item, property) => {
          switch(property) {
            case 'department.name': return item.department.name;
            default: return property;
          }
        };
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      (error) => {
        console.error("Error occurred:", error);
      }

    );
    
  }

  
  
}
