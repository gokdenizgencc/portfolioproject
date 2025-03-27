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
  username:string;
  profilePhoto:string;
  github:string;
  linkedIn:string;
  website:string;
  email:string;
  skills: Skill[];
  certificates: Certificate[];
  socialLinks: SocialLink[];
  projects: ProjectDto[];
  blogs: Blog[];
  comments: Comments[];
  userInfos:UserInfos;
  workExperiences:WorkExperience[];
  educationInfo:EducationInfo[];
  foreignLanguage:ForeignLanguages[];
}
