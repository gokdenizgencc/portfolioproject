import { Skill } from "./skill";

export interface UserInfoAboutDto { 
    userInfoId:number;
    salaryException?: string;
    bio?: string;
    profession?:string;
    fullName?:string;
    skills?: Skill[];
}