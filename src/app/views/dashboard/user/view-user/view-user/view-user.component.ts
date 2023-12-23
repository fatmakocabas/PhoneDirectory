import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { UserRequest } from "app/shared/models/UserRequest";
import { Department } from "app/shared/models/department.model";
import { DepartmentSection } from "app/shared/models/departmentSection.model";
import { User } from "app/shared/models/user.model";
import { DepartmentService } from "app/shared/services/department.service";
import { UserService } from "app/shared/services/user.service";

@Component({
  selector: "app-view-user",
  templateUrl: "./view-user.component.html",
  styleUrls: ["./view-user.component.scss"],
})
export class ViewUserComponent implements OnInit {
  formData = {};
  console = console;
  userForm: FormGroup;
  loading: boolean = false;

  userId: string | null | undefined;
  user: User = {
    id: "",
    email: "",
    userName:"",
    name: "",
    surname: "",

  };
  deparmentList: Department[] = [];
  sectionList: DepartmentSection[] = [];
  sectionListByDepartment: DepartmentSection[] = [];
  isNewUser = false;
  header = "";
  displayProfileImageUrl = "";
  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private userService: UserService,
    private departmentService: DepartmentService,
    private readonly route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadDepartments();
    this.loadSections();
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get("id");
      debugger;
      //studentId add ise eklemeye göre
      if (this.userId === "add") {
        this.isNewUser = true;
        this.header = "User Ekle";
        this.initForm(null);
        //this.setImage();
      } else {
        this.isNewUser = false;
        this.header = "User Düzenle";
        this.userService.getUser(this.userId).subscribe(
          (success) => {
            this.user = success;
            this.initForm(this.user);
            //this.setImage();
          },
          // (error) => {
          //   this.setImage();
          // }
        );
      }
    });
  }

  initForm(user: User) {
    this.userForm = this.fb.group({
      //id: [user?.id || null],
      email: [user?.email || "", [Validators.required, Validators.email]],
      userName: [user?.userName || "", Validators.required],
      name: [user?.name || "", Validators.required],
      surname: [user?.surname || "", Validators.required],
      
    });

    // department değişikliğinde sectionListByDepartment'in güncellenmesi için bir listener ekleyin
    this.userForm.get('department')?.valueChanges.subscribe(selectedDepartmentId => {
      this.sectionListByDepartment = this.sectionList.filter(section => section.departmentId === selectedDepartmentId);
      this.sectionListByDepartment.unshift(null);
    });

    console.log("userForm", this.userForm);
  }
  loadDepartments() {
    this.departmentService.allDepartments().subscribe(
      (success) => {

        this.deparmentList = success;
      },
      (error) => {
        console.error("Error occurred:", error);
      }
    );
  }

  loadSections() {
    this.departmentService.allSections().subscribe(
      (success) => {

        this.sectionList = success;
      },
      (error) => {
        console.error("Error occurred:", error);
      }
    );
  }

  onDepartmentChange(event: MatSelectChange) {
    const selectedDepartmentId = event.value;
    this.sectionListByDepartment = this.sectionList.filter(section => section.departmentId === selectedDepartmentId);
    this.sectionListByDepartment.unshift(null);
  }

  onUpdate() {
    this.console.log("updategirdi");

    const controls = this.userForm.controls;
    const userRequest: UserRequest = {
      //id: controls["id"].value,
      email: controls["email"].value,
      userName: controls["userName"].value,
      name: controls["name"].value,
      surname: controls["surname"].value,
    }

    this.userService
      .updateUser(this.user.id, userRequest)
      .subscribe(
        (success) => {
          this.snackbar.open(
            "User başarılı bir şekilde güncellendi!",
            undefined,
            {
              duration: 2000,
            }
          );
          this.router.navigateByUrl("admin/users");
        },
        (error) => {
          this.snackbar.open("User güncellenemedi!", undefined, {
            duration: 2000,
          });
        }
      );
  }

  onDelete() {
    this.console.log("deletegirdi");
    debugger;
    this.userService
      .deleteUser(this.userId)
      .subscribe(
        (success) => {
          this.snackbar.open(
            "User başarılı bir şekilde silindi!",
            undefined,
            {
              duration: 2000,
            }
          );
          setTimeout(() => {
            this.router.navigateByUrl('admin/users');
          }, 2000)
        },
        (error) => {
          this.snackbar.open("User silinemedi!", undefined, {
            duration: 2000,
          });
        }
      );
  }

  onAdd() {
    this.console.log("addgirdi");
    debugger;
    const controls = this.userForm.controls;
    const userRequest: UserRequest = {
      email: controls["email"].value,
      userName: controls["userName"].value,
      name: controls["name"].value,
      surname: controls["surname"].value,
    }

    this.userService.addUser(userRequest)
      .subscribe(
        (success) => {
          debugger;
          this.snackbar.open('User başarılı bir şekilde eklendi!', undefined, {
            
            duration: 2000
          })
          setTimeout(() => {
            this.router.navigateByUrl(`admin/users/${success.id}`);
          }, 2000)

        },
        (error) =>{
          debugger;
          this.console.log(error?.error);
          const regex = /errorSameEmail/i;         
          if (error?.error && regex.test(error.error)) {
            this.snackbar.open("Eklemeye çalıştığınız e-mail adresi aynı olmamalıdır.", undefined, { duration: 2000 });
           } else {
            this.snackbar.open('User eklenemedi!',undefined,{
              duration: 2000
            })
          }
        }
      )
  }

}
