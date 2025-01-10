import { Blog } from "./blog";
import { Certificate } from "./certificate";
import { Comments } from "./comments";
import { Project } from "./project";
import { Skill } from "./skill";
import { SocialLink } from "./socialLink";

export interface UserAllInfo {
  name: string;
  skills: Skill[];
  certificates: Certificate[];
  socialLinks: SocialLink[];
  projects: Project[];
  blogs: Blog[];
  comments: Comments[];
}
