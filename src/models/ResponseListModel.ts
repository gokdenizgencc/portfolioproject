import { ResponseModel } from "./responsModel";

export interface ResponseListModel<T> extends ResponseModel {
    data:T[] 
}