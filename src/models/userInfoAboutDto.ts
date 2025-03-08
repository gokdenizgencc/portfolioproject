import { Skill } from "./skill";

export interface UserInfoAboutDto { 
    salaryException?: string;
    bio?: string;
    skills?: Skill[];
}