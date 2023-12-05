
export interface DepartmentRequest {
  id?:string,
  name: string,
  description?: string,
  fax?: string, 
  addressId: string,
  section?:string,
  order:number, 
}