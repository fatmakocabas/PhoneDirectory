import { Address } from "./address.model";

export interface AddressSection{
  id: string,
  name:string,
  description: string,  
  addressId: string,
  address: Address 
}
