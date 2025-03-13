import { Skill } from "./skill";

export interface UserInfoAboutDto { 
    salaryException?: string;
    bio?: string;
    profession?:string;
    fullName?:string;
    skills?: Skill[];
}