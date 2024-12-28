import { Project } from "./project";
import { ResponseModel } from "./responsModel";

export interface ProjectResponseModel extends ResponseModel{
    data:Project[]
}