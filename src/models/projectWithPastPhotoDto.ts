export interface ProjectWithPastPhotoDto {
    projectId: number;
    userId: number;
    title: string;
    description: string;
    projectUrl: string;
    createdAt: Date;
    projectPhotoUrl: string;
    pastProjectTitle:string;
  }