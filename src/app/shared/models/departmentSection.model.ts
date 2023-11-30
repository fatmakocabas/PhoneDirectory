import { Department } from "./department.model";

export interface DepartmentSection{
  id: string,
  name:string,
  description: string,  
  departmentId: string,
  department: Department 
}
