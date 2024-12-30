import { ResponseModel } from "./responsModel";

export interface ListResponseModel<T> extends ResponseModel{
      data:T[];
}