import { Address } from "./address.model";
import { Section } from "./departmentSection.model";

export interface Department{
  id: string,
  name:string,
  description?: string,
  fax?:string,
  order?:number,
  sectionList?: Section[] ; 
  addressId: string,
  address: Address 
}
