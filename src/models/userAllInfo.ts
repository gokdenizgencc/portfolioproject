import { UserInfo } from "os";
import { Blog } from "./blog";
import { Certificate } from "./certificate";
import { Comments } from "./comments";
import { Project } from "./project";
import { ProjectDto } from "./projectDto";
import { Skill } from "./skill";

import { SocialLink } from "./socialLink";
import { WorkExperience } from "./workExperience";
import { EducationInfo } from "./educationInfo";
import { ForeignLanguages } from "./foreignLanguage";
import { UserInfos } from "./userInfo";

export interface UserAllInfo {
  name: string;
  profilePhoto:string;
  nickName:string;
  github:string;
  linkedIn:string;
  website:string;
  skills: Skill[];
  certificates: Certificate[];
  projects: ProjectDto[];
  blogs: Blog[];
  comments: Comments[];
  userInfos:UserInfos;
  workExperiences:WorkExperience[];
  educationInfo:EducationInfo[];
  foreignLanguage:ForeignLanguages[];
}
