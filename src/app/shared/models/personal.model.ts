import { Department } from "./department.model";
import { DepartmentSection } from "./departmentSection.model";

export interface Personal {
  id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  email: string,
  mobile: number,
  profileImageUrl: string,
  ext: string,
  title: string,
  departmentId: string,
  department: Department,
  sectionId?:string,
  section?:DepartmentSection,
  order?:number,
  isActive?:boolean
}