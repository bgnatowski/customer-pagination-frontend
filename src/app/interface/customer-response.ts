import {Customer} from "./customer";

export interface CustomerResponse{
  timeStamp : string,
  statusCode : number,
  status : string,
  message : string
  data : { customer: Customer}
}
