import { ForeignLanguages } from "./foreignLanguage";

export interface ForeignLanguageDto {
    userId: number;
    foreignLanguages?:ForeignLanguages[]
}