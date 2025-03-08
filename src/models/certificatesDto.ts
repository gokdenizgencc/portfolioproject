import { Certificate } from "./certificate";


export interface CertificatesDto {
    userId: number; 
    certificates:Certificate[] 
}