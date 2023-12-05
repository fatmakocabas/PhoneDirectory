import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { DepartmentRequest } from "app/shared/models/DepartmentRequest";
import { Address } from "app/shared/models/address.model";
import { Department } from "app/shared/models/department.model";
import { AddressService } from "app/shared/services/address.service";
import { DepartmentService } from "app/shared/services/department.service";

@Component({
  selector: "app-view-department",
  templateUrl: "./view-department.component.html",
  styleUrls: ["./view-department.component.scss"],
})
export class ViewDepartmentComponent implements OnInit {
  formData = {};
  console = console;
  departmentForm: FormGroup;
  loading: boolean = false;
  departmentId: string | null | undefined;
  department: Department = {
    id: "",
    name: "",
    description: "",
    sectionList:[],
    order: 0,   
      addressId: "",
      address: {
        id: "",
        physicalAddress: "",
        floor: 0,
      },
    }
  
  
  addressList: Address[] = [];
  isNewDepartment = false;
  header = "";
  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private deparmentService: DepartmentService,
    private addressService: AddressService,
    private readonly route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadAddresses();
    this.route.paramMap.subscribe((params) => {
      this.departmentId = params.get("id");
      
      if (this.departmentId === "add") {
        this.isNewDepartment = true;
        this.header = "Müdürlük Ekle";
        this.initForm(null);
      } else {
        this.isNewDepartment = false;
        this.header = "Müdürlük Düzenle";
        this.deparmentService.getDepartment(this.departmentId).subscribe(
          (success) => {
            debugger;
            this.department = success;
            this.initForm(this.department);
          },
          (error) => {
          }
        );
      }
    });
  }

  initForm(department: Department) {
    this.departmentForm = this.fb.group({
      id: [department?.id || null],
      name: [department?.name || "", Validators.required],
      description: [department?.description || "", Validators.required],
      order: [department?.order || "", Validators.required],
      fax: [department?.fax || null],    
      section: [''], // Bu alana kullanıcının gireceği yeni bölümleri eklemek için bir giriş alanı ekledik
      sectionList: [department?.sectionList || []],
      address: [department?.addressId || null],
    });
  }

  loadAddresses() {
    this.addressService.allAddresses().subscribe(
      (success) => {
        this.addressList = success;
      },
      (error) => {
        console.error("Error occurred:", error);
      }
    );
  }

  addSection() {
    const newSectionName  = this.departmentForm.value.section;
  
    // Eğer yeni bölüm daha önce eklenmemişse, listeye ekle
    if (newSectionName && !this.departmentForm.value.sectionList.some(section => section.name === newSectionName)) {
      const newSection = { name: newSectionName };
      const updatedSectionList = [...this.departmentForm.value.sectionList, newSection];
      this.departmentForm.patchValue({ sectionList: updatedSectionList });
    }
    // Giriş alanını temizle
    this.departmentForm.patchValue({ section: '' });
  }
 
  onUpdate() {
    this.console.log("updategirdi");
   
    const controls = this.departmentForm.controls;
    const departmentRequest : DepartmentRequest ={
      id: this.departmentId,
      name: controls["name"].value,
      description: controls["description"].value,
      fax: controls["fax"].value,
      addressId: controls["address"].value,
      order:controls["order"].value,
      section:controls["sectionList"].value,
    }
   
    this.deparmentService
      .updateDepartment(this.department.id, departmentRequest)
      .subscribe(
        (success) => {
          this.snackbar.open(
            "Müdürlük başarılı bir şekilde güncellendi!",
            undefined,
            {
              duration: 2000,
            }
          );
          this.router.navigateByUrl("admin/departments");
        },
        (error) => {
          this.snackbar.open("Müdürlük güncellenemedi!", undefined, {
            duration: 2000,
          });
        }
      );
  }

  onDelete() {
    this.console.log("deletegirdi");
    // this.studentService.deleteStudent(this.student.id).subscribe(
    //   (success) => {
    //     this.snackbar.open('Öğrenci başarılı bir şekilde silindi!',undefined,{
    //       duration: 2000
    //     })

    //     setTimeout(()=>{
    //       this.router.navigateByUrl('students');
    //     },2000)

    //   },
    //   (error) => {
    //     this.snackbar.open('Öğrenci silinmedi!',undefined,{
    //       duration: 2000
    //     })
    //   }
    // )
  }

  onAdd() {
    this.console.log("addgirdi");
    debugger;
    
    const controls = this.departmentForm.controls;
    const departmentRequest : DepartmentRequest ={
      name: controls["name"].value,
      description: controls["description"].value,
      fax: controls["fax"].value,
      addressId: controls["address"].value,
      order:controls["order"].value,
      section:controls["sectionList"].value,
    }
   
    this.deparmentService.addDepartment(departmentRequest)
    .subscribe(
      (success) =>{
           this.snackbar.open('Müdürlük başarılı bir şekilde eklendi!',undefined,{
             duration: 2000
           })
           setTimeout(()=>{
            this.router.navigateByUrl(`admin/departments/${success.id}`);
          },2000)

      },
      (error) =>{
         this.snackbar.open('Müdürlük eklenemedi!',undefined,{
           duration: 2000
         })

     }
    )
  }

}
