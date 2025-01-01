import { ResponseModel } from "./responsModel";

export interface SingleResponseModel<T> extends ResponseModel{
    data:T
}