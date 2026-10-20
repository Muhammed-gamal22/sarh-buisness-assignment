import { CompanyFormProps, CompanyPackage, companyStatus } from "@/types";
export interface CompanyStatusStoreProps{
    statusData:companyStatus[];
    setStatusData:(state:companyStatus[])=>void;
}
export interface CompanyPackageStoreProps{
    packageData:string[];
    setPackageData:(state:string[])=>void;
}

export interface Companines{
    companies:string[];
    setCompanies:(state:string[])=>void;
}
export interface InvoiceStatusStoreProps{
    statusData:string[];
    setStatusData:(state:string[])=>void;
}
export interface CompaniesDataStoreProps{
    companiesData:CompanyFormProps[];
    setCompaniesData:(state:CompanyFormProps[])=>void;
}
export interface TokenStoreProps{
    token:string|null;
    setToken:(token:string|null)=>void;
    removeToken:()=>void;
}