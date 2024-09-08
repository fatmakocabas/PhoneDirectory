import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Department } from "app/shared/models/department.model";
import { DepartmentService } from "app/shared/services/department.service";
import { MatDialog } from "@angular/material/dialog";
import { AppComfirmComponent } from "app/shared/services/app-confirm/app-confirm.component";
import { Section } from "app/shared/models/section.model";
import { SectionService } from "app/shared/services/section.service";
import { SectionRequest } from "app/shared/models/SectionRequest";

@Component({
  selector: "app-view-section",
  templateUrl: "./view-section.component.html",
  styleUrls: ["./view-section.component.scss"],
})
export class ViewSectionComponent implements OnInit {
  formData = {};
  console = console;
  sectionForm: FormGroup;
  loading: boolean = false;
  sectionId: string | null | undefined;
  section: Section = {
    id: "",
    name: "",
    description: "", 
    order: 0,
    departmentId: "",
    department: {
      id: "",
      name: "",
      description: "",
      fax: "",
      addressId: "",
      address: {
        id: "",
        physicalAdress: "",
        floor: 0,
      },
    },
  

  };
  deparmentList: Department[] = [];
  isNewSection = false;
  header = "";
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private sectionService: SectionService,
    private departmentService: DepartmentService,
    private readonly route: ActivatedRoute,
    private router: Router
  ) { }

  openDeleteConfirmationDialog(): void {
    const dialogRef = this.dialog.open(AppComfirmComponent, {
      width: '400px',
      data: {
        title: 'Uyarı!',
        message: 'Birim kaydını silmek istediğinize emin misiniz?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDelete();
        console.log('Item deleted!');
      } else {
        console.log('Deletion canceled.');
      }
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadDepartments();
    this.route.paramMap.subscribe((params) => {
      this.sectionId = params.get("id");
      debugger;
      //studentId add ise eklemeye göre
      if (this.sectionId === "add") {
        this.isNewSection = true;
        this.header = "Personel Ekle";
        this.initForm(null);
       
      } else {
        this.isNewSection = false;
        this.header = "Personel Düzenle";
        this.sectionService.getSection(this.sectionId).subscribe(
          (success) => {
            this.section = success;
            this.initForm(this.section);
            
          },
          (error) => {
           
          }
        );
      }
    });
  }
  initForm(section: Section) {
    this.sectionForm = this.fb.group({
      id: [section?.id || null],
      name: [section?.name || "", Validators.required],     
      description: [section?.description || ""],
      order: [section?.order || null, Validators.required],
      department: [section?.departmentId || null],
    });
  
  }
  loadDepartments() {
    this.departmentService.allDepartments().subscribe(
      (success) => {

        this.deparmentList = success;
        debugger;
      },
      (error) => {
        console.error("Error occurred:", error);
      }
    );
  }

  get orderControl() {
    return this.sectionForm.get('order');
  }


  onUpdate() {
    this.console.log("updategirdi");

    const controls = this.sectionForm.controls;
    const sectionRequest: SectionRequest = {
      name: controls["name"].value,
      description: controls["description"].value,      
      departmentId: controls["department"].value,     
      order: controls["order"].value,
    }

    this.sectionService
      .updateSection(this.section.id, sectionRequest)
      .subscribe(
        (success) => {
          this.snackbar.open(
            "Birim başarılı bir şekilde güncellendi!",
            undefined,
            {
              duration: 2000,
            }
          );
          this.router.navigateByUrl("admin/sections");
        },
        (error) => {
          debugger;    

          const order = /orderAlreadyUse/;
          const name = /isNameInUse/;
          if (error?.error && order.test(error.error)) {
            this.snackbar.open("Bu sıra başka bir birim tarafından kullanılmış. ", undefined, { duration: 2000 });
           }  
           else if (error?.error && name.test(error.error)) {
            this.snackbar.open( "Bu isim başka bir birim tarafından kullanılmış.", undefined, { duration: 2000 });
           }               
           else {
            this.snackbar.open("Birim güncellenemedi! hata: "+ error?.error, undefined, { duration: 2000 }); 
          }
         
        }
      );
  }

  onDelete() {
    this.console.log("deletegirdi");
    debugger;
    this.sectionService
      .deleteSection(this.sectionId)
      .subscribe(
        (success) => {
          this.snackbar.open(
            "Birim başarılı bir şekilde silindi!",
            undefined,
            {
              duration: 2000,
            }
          );
          setTimeout(() => {
            this.router.navigateByUrl('admin/sections');
          }, 2000)
        },
        (error) => {
          this.snackbar.open("Birilm silinemedi!", undefined, {
            duration: 2000,
          });
        }
      );
  }

  onAdd() {
    this.console.log("addgirdi");

    const controls = this.sectionForm.controls;
    const sectionRequest: SectionRequest = {
      name: controls["name"].value,
      description: controls["description"].value,      
      departmentId: controls["department"].value,     
      order: controls["order"].value,
    }

    this.sectionService.addSection(sectionRequest)
      .subscribe(
        (success) => {
          debugger;
          this.console.log("ssss:"+success.id);
          this.snackbar.open('Birim başarılı bir şekilde eklendi!', undefined, {
            duration: 2000
          })
       
          setTimeout(() => {
            this.router.navigateByUrl(`admin/sections/${success.id}`);
          }, 2000)

        },
        // (error) => {
        //   this.snackbar.open('Personel eklenemedi!', undefined, {
        //     duration: 2000
        //   })

        // }
        (errorReponse) => {
          const errorMessage = errorReponse.error;
          const order = /orderAlreadyUse/;
          const name = /isNameInUse/;
          if (errorReponse?.error && order.test(errorReponse.error)) {
            this.snackbar.open("Bu sıra başka bir birim tarafından kullanılmış. ", undefined, { duration: 2000 });
           }  
           else if (errorReponse?.error && name.test(errorReponse.error)) {
            this.snackbar.open( "Bu isim başka bir birim tarafından kullanılmış.", undefined, { duration: 2000 });
           }               
           else {
            this.snackbar.open("Birim eklenemedi! hata: "+ errorReponse?.error, undefined, { duration: 2000 }); 
          }
         
        }
      )
  }
 
}
