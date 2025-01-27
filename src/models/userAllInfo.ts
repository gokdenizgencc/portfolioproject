import { Blog } from "./blog";
import { Certificate } from "./certificate";
import { Comments } from "./comments";
import { Project } from "./project";
import { ProjectDto } from "./projectDto";
import { Skill } from "./skill";
import { SocialLink } from "./socialLink";

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
}
