import { ChangeDetectorRef, Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription, finalize } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PersonalService } from "app/shared/services/personal.service";
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
})
export class MainPageComponent implements OnInit, OnDestroy {
  loaded = false;
  personelList: any[];
  currentYear: number;
  searchTerm: string = "";
  isHighlighted = false;
  constructor(
    private cdr: ChangeDetectorRef,
    public personalService: PersonalService,
    private snackbar: MatSnackBar
  ) {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
  }

  ngOnInit() {
    this.loaded = true;
    this.loadPersonels();
   
  }

  onSearch(value: string): void {
    this.searchTerm = value;
    this.search();
  }
  normalizeSearchTerm = (str: string) => {
    return str.toLocaleLowerCase("tr-TR");
  };

  search(): void {
    const normalize = (str: string) => {
      return str
        .toLocaleLowerCase("tr-TR")
        .normalize("NFKD")
        .replace(/[^\u0000-\u007F]/g, (match) => {
          switch (match) {
            case "ı":
              return "i";
            case "ü":
              return "u";
            case "ö":
              return "o";
            case "ç":
              return "c";
            case "ş":
              return "s";
            case "ğ":
              return "g";
            case "İ":
              return "i";
            case "Ü":
              return "u";
            case "Ö":
              return "o";
            case "Ç":
              return "c";
            case "Ş":
              return "s";
            case "Ğ":
              return "g";
            default:
              return "";
          }
        });
    };
    const searchTerm = normalize(this.searchTerm);
    const elements = document.querySelectorAll("[data-person-name]");
    console.log("Normalized searchTerm: " + normalize(this.searchTerm));

    const matchingElements = Array.from(elements).filter((element) => {
      const personName = element.getAttribute("data-person-name");
      const regex = new RegExp(`\\b${searchTerm}\\b`, 'gi');
      return personName && regex.test(normalize(personName));
    });
    
    if (matchingElements.length > 0) {
      // Find the currently highlighted element
      let currentIndex = -1;
      matchingElements.forEach((element, index) => {
        if (element.classList.contains("highlight")) {
          currentIndex = index;
        }
      });

      // Determine the index of the next element to highlight
      let nextIndex = currentIndex + 1;
      if (nextIndex >= matchingElements.length) {
        nextIndex = 0; // Loop back to the first element if at the end
      }

      // Remove highlight from all elements
      const previousHighlight = document.querySelector(".highlight");
      if (previousHighlight) {
        previousHighlight.classList.remove("highlight");
      }

      // Highlight and scroll to the next element
      const nextElement = matchingElements[nextIndex] as HTMLElement;
      if (nextElement) {
        nextElement.classList.add("highlight");
        nextElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      this.snackbar.open("Personel bulunamadı!", undefined, { duration: 3000 });
    }
  }

  ngOnDestroy() {}
  loadPersonels() {
    this.loaded = false;
    
    this.personalService
      .allPersonels()
      .pipe(
        finalize(() => {
          this.loaded = true;
          this.cdr.detectChanges();
          this.processPersonelList(); // Yeni fonksiyon çağrısı
        })
      )
      .subscribe((res) => {
        this.personelList = res;
        if (this.personelList) {
          this.personelList = this.personelList.filter(
            (personel) => personel.isActive === true
          );
        }
      });
  }
  previousSection: string;

  // ...
  processPersonelList() {
    this.uniqueAddresses = this.getUniqueAddresses(this.personelList);
    this.uniqueAddresses.forEach((address) => {
      address.departments = this.getDepartmentsByAddress(address);
      address.departments.forEach((department) => {
        department.orderedPersons =
          this.getOrderedPersonsByDepartmentAndAddress(department, address);
      });

      // Her department için önceki section sıfırlanır
      this.previousSection = null;
      
      // Her department içindeki orderedPersons'ları kontrol ederken önceki section bilgisini kaydeder
      for (let i = 0; i < address.departments.length; i++) {
        const department = address.departments[i];

        for (let j = 0; j < department.orderedPersons.length; j++) {
          const person = department.orderedPersons[j];

          if (
            person.section &&
            (!this.previousSection ||
              person.section.name !== this.previousSection)
          ) {
            // Eğer person bir sectiona sahipse ve önceki section yoksa veya farklıysa
            person.showSectionTitle = true;
          } else {
            person.showSectionTitle = false;
          }

          // Şu andaki person'un section bilgisini kaydeder
          this.previousSection = person.section?.name;
        }
      }
    });
  }
  uniqueAddresses = [];
  uniqueAddressIds = [];

  getUniqueAddresses(list: any[]): any[] {
    list.sort(
      (a, b) => a.department.address.order - b.department.address.order
    );
    for (const person of list) {
      const addressId = person.department.address.id;
      if (!this.uniqueAddressIds.includes(addressId)) {
        this.uniqueAddressIds.push(addressId);
        this.uniqueAddresses.push(person.department.address);
      }
    }
    console.log("adres adedi:"+ this.uniqueAddresses.length);
    return this.uniqueAddresses;
  }
  getDepartmentsByAddress(address: any): any[] {
    const departments = [];
    for (const person of this.personelList) {
      if (person.department.address.id === address.id) {
        if (!departments.find((dep) => dep.id === person.department.id)) {
          departments.push(person.department);
        }
      }
    }
    departments.sort((a, b) => a.order - b.order);
    return departments;
  }

  getOrderedPersonsByDepartmentAndAddress(
    department: any,
    address: any
  ): any[] {
    const orderedPersons = this.getPersonsByDepartmentAndAddress(
      department,
      address
    );

    // Sıralama işlemini gerçekleştir
    orderedPersons.sort((a, b) => {
      // İlk olarak boş section olanları öne getir
      if (!a.section && b.section) {
        return -1;
      } else if (a.section && !b.section) {
        return 1;
      }

      // Eğer her iki personel de bir section'a sahipse sıralama yap
      if (a.section && b.section) {
        if (a.section.name === b.section.name) {
          // Aynı section içinde ise department ve person order'a göre sırala
          return a.order - b.order;
        } else {
          // Farklı section'larda ise section ismine göre sırala
          // return a.section.name.localeCompare(b.section.name);
            // Talep no: 822834 ya göre  sectionlar sectionı order'a göre sıralama sağlandı
        return a.section.order - b.section.order;
        }
      }

      // Her ikisi de bir section'a sahip değilse, önce department order'a, sonra person order'a göre sırala
      return a.department.order !== b.department.order
        ? a.department.order - b.department.order
        : a.order - b.order;
    });

    return orderedPersons;
  }
  getPersonsByDepartmentAndAddress(department: any, address: any): any[] {
    return this.personelList.filter(
      (person) =>
        person.department.id === department.id &&
        person.department.address.id === address.id
    );
  }
  users = [
    {
      name: "Snow Benton",
      membership: "Paid Member",
      phone: "+1 (956) 486-2327",
      photo: "assets/images/face-1.jpg",
      address: "329 Dictum Court, Minnesota",
      registered: "2016-07-09",
    },
    {
      name: "Kay Sellers",
      membership: "Paid Member",
      phone: "+1 (929) 406-3172",
      photo: "assets/images/face-2.jpg",
      address: "893 Garden Place, American Samoa",
      registered: "2017-02-16",
    },
    {
      name: "Robert Middleton",
      membership: "Paid Member",
      phone: "+1 (995) 451-2205",
      photo: "assets/images/face-3.jpg",
      address: "301 Hazel Court, West Virginia",
      registered: "2017-01-22",
    },
    {
      name: "Delaney Randall",
      membership: "Paid Member",
      phone: "+1 (922) 599-2410",
      photo: "assets/images/face-4.jpg",
      address: "128 Kensington Walk, Ohio",
      registered: "2016-12-08",
    },
    {
      name: "Melendez Lawrence",
      membership: "Paid Member",
      phone: "+1 (824) 589-2029",
      photo: "assets/images/face-5.jpg",
      address: "370 Lincoln Avenue, Florida",
      registered: "2015-03-29",
    },
    {
      name: "Galloway Fitzpatrick",
      membership: "Paid Member",
      phone: "+1 (907) 477-2375",
      photo: "assets/images/face-6.jpg",
      address: "296 Stuyvesant Avenue, Iowa",
      registered: "2015-12-12",
    },
    {
      name: "Watson Joyce",
      membership: "Paid Member",
      phone: "+1 (982) 500-3137",
      photo: "assets/images/face-7.jpg",
      address: "224 Visitation Place, Illinois",
      registered: "2015-08-19",
    },
    {
      name: "Ada Kidd",
      membership: "Paid Member",
      phone: "+1 (832) 531-2385",
      photo: "assets/images/face-1.jpg",
      address: "230 Oxford Street, South Dakota",
      registered: "2016-08-11",
    },
    {
      name: "Raquel Mcintyre",
      membership: "Paid Member",
      phone: "+1 (996) 443-2102",
      photo: "assets/images/face-2.jpg",
      address: "393 Sullivan Street, Palau",
      registered: "2014-09-03",
    },
    {
      name: "Juliette Hunter",
      membership: "Paid Member",
      phone: "+1 (876) 568-2964",
      photo: "assets/images/face-3.jpg",
      address: "191 Stryker Court, New Jersey",
      registered: "2017-01-18",
    },
    {
      name: "Workman Floyd",
      membership: "Paid Member",
      phone: "+1 (996) 481-2712",
      photo: "assets/images/face-4.jpg",
      address: "350 Imlay Street, Utah",
      registered: "2017-05-01",
    },
    {
      name: "Amanda Bean",
      membership: "Paid Member",
      phone: "+1 (894) 512-3907",
      photo: "assets/images/face-5.jpg",
      address: "254 Stockton Street, Vermont",
      registered: "2014-08-30",
    },
  ];
}
