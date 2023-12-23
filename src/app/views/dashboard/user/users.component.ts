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
import { UserService } from "app/shared/services/user.service";
import { User } from "app/shared/models/user.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
  animations: matxAnimations
})
export class UsersComponent implements OnInit, AfterViewInit {

  users: User[] = [];
  displayedColumns: string[] = ['email','userName', 'name', 'surname','action'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString = '';

  constructor(private themeService: ThemeService, private userService: UserService) { }

  ngAfterViewInit() { }
  ngOnInit() {

    this.userService.allUsers().subscribe(
      (success) => {

        this.users = success;


        this.dataSource = new MatTableDataSource<User>(this.users);

        // this.dataSource.sortingDataAccessor = (item, property) => {
        //   switch (property) {
        //     case 'department.name': return item.department.name;
        //     default: return property;
        //   }
        // };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error("Error occurred:", error);
      }

    );

  }
}
