import { Department } from "./department.model";

export interface Section {
  id: string,
  name: string,
  description?: string,
  departmentId: string,
  department: Department, 
  order:number,
}