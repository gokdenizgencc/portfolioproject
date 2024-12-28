import { ResponseModel } from "./responsModel";
import { User } from "./user";

export interface UserResponseModel extends ResponseModel{
    data:User[],
}