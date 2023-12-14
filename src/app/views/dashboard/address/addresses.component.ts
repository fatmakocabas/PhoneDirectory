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
import { Address } from "app/shared/models/address.model";
import { AddressService } from "app/shared/services/address.service";

@Component({
  selector: "app-addresses",
  templateUrl: "./addresses.component.html",
  styleUrls: ["./addresses.component.scss"],
  animations: matxAnimations
})
export class AddressesComponent implements OnInit, AfterViewInit {
  
  addresses:Address[]=[];
  displayedColumns: string[] = ['physicalAdress', 'order', 'floor','action'];
  dataSource:MatTableDataSource<Address> = new MatTableDataSource<Address>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString = '';

  constructor(private themeService: ThemeService, private addressService: AddressService) {}

  ngAfterViewInit() {}
  ngOnInit() {
  
    this.addressService.allAddresses().subscribe(
      (success) =>{       
        this.addresses = success;
        console.log("success:",success);
        this.dataSource = new MatTableDataSource<Address>(this.addresses);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch(property) {
            case 'physicalAdress': return item.physicalAdress;
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
