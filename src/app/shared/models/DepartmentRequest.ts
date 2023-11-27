
export interface DepartmentRequest {
  name: string,
  description?: string,
  fax?: string, 
  addressId: string,
  section?:string,
  order:number, 
}