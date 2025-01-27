import { ProjectPhotoDto } from './projectPhotoDto';

export interface ProjectDto {
    projectId: number;
    userId: number;
    title: string;
    description: string;
    createdAt: Date;
    photosUrls: ProjectPhotoDto[];
  }