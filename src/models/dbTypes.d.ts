import { Document as BaseDocument } from "mongoose";

interface Document extends BaseDocument {
    createdAt?: Date;
    updatedAt?: Date;
}


export interface IAccessToken extends Document {
    access_token: string;
    refresh_token?: string;
    account_id?: string;
    active?: boolean;
}


export interface IUser extends Document {
    user_id: string;
    name: string;
    mobile: string;
    email: string;
    password: string;
    login_type: string;
    google_account_id: string;
    city: string;
    active:boolean;
    mobile_type: string;
    access_token: string;

}



export interface ICustomer extends Document {
    name: string;
    mainAadhaar: number;
    consumerNo: string;
    mobile: number;
    familyAadhaar: string;
    regNo: number;
    mainAgent: string;
    subAgent: string;
    remarks: string;
    addedBy: string;
    InstalationLetter:string;
    satisfactionLetter:string;
    otherLetter:string;
    installStatus:string;

}

export interface IOldCustomer extends Document {
    name: string;
    mainAadhaar: number;
    consumerNo: string;
    mobile: number;
    regNo: number;
    mainAgent: string;
    subAgent: string;
    remarks: string;
    addedBy: string;
    installStatus:string;
    rgisteredAgencyName:string
    oldAgentName:string
    year:string
}


export interface IAgent extends Document {
    name: string;
    mobile: number;
    address: string;
}

export interface ITrashCustomers extends Document {
    name: string;
    mainAadhaar: number;
    consumerNo: string;
    mobile?: number;
    familyAadhaar?: string;
    regNo: number;
    mainAgent: string;
    subAgent?: string;
    remarks: string;
    addedBy?: string;
}



export interface IConnection extends Document {
    agent: string;
    totalConnection: number;
    load: string;
    regulator: number;
    pipe: string;
    totalLight: number;
    paidLight: number;
    bplOven: number;
    nonHpOven: number;
    hpOven: number;
    totalAmount: number;
    paidAmount: number;
    remarks: string;
    nonHpOvenPricing:number;
    hpOvenPricing:number
}



export interface IPricing extends Document {
    nonHpOvenPricing:number;
    hpOvenPricing:number
}






export interface ISalesHistory extends Document {
    agent: string;
    totalConnection: number;
    load: string;
    regulator: number;
    pipe: string;
    totalLight: number;
    paidLight: number;
    bplOven: number;
    nonHpOven: number;
    hpOven: number;
    totalAmount: number;
    paidAmount: number;
    remarks: string;
    nonHpOvenPricing:number;
    hpOvenPricing:number
}

