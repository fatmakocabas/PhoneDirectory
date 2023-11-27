import { Address } from "./address.model";
import { DepartmentSection } from "./departmentSection.model";

export interface Department{
  id: string,
  name:string,
  description?: string,
  fax?:string,
  order?:number,
  sectionList?: DepartmentSection[] ; 
  addressId: string,
  address: Address 
}
