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
    active: boolean;
    mobile_type: string;
    access_token: string;
    dob: string;
    is_online: boolean;
    profile_url: string;
    status: string;
    last_login_timestamp: Date;
    role: string;
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
    InstalationLetter: string;
    satisfactionLetter: string;
    otherLetter: string;
    installStatus: string;
    registeredAgencyName: string;
    updatedBy:string
    installtatus:string
    isSingleWomen:boolean
    isFreeDelivery:boolean
    contactNumber:string
    registrationStatus:string
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
    installStatus: string;
    registeredAgencyName: string;
    oldAgentName: string;
    year: string;
    InstalationLetter: string;
    satisfactionLetter: string;
    otherLetter: string;
}

export interface IAgent extends Document {
    name: string;
    mobile: number;
    address: string;
    email: string;
    active: boolean;
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
    load: number;
    regulator: number;
    pipe: number;
    totalLight: number;
    paidLight: number;
    bplOven: number;
    nonHpOven: number;
    hpOven: number;
    totalAmount: number;
    paidAmount: number;
    remarks: string;
    nonHpOvenPricing: number;
    hpOvenPricing: number;
}

export interface IPricing extends Document {
    nonHpOvenPricing: number;
    hpOvenPricing: number;
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
    nonHpOvenPricing: number;
    hpOvenPricing: number;
}

export interface INCdelivery extends Document {
    agent: string;
    totalLod: number;
    totalRegulator: number;
    totalPipe: number;
    totalBplOven: number;
    totalHpOven: number;
    totalNonHpOven: number;
    totalLight: number;
    totalAmount: number;
    totalAmountDue: number;
}

export interface IRefilSaleSchema extends Document {
    agent: string;
    loadPaid14: number;
    emptyCycliderRecived14: number;
    emptyDue14: number;
    rate14: number;
    loadPaid19: number;
    emptyCycliderRecived19: number;
    emptyDue19: number;
    rate19: number;
    loadPaid5: number;
    emptyCycliderRecived5: number;
    emptyDue5: number;
    rate5: number;
    loadPaid5ftl: number;
    emptyCycliderRecived5ftl: number;
    emptyDue5ftl: number;
    rate5ftl: number;
    spCategory: string;
    spQantity: number;
    spRate: number;
    remarks: string;
    amountPaid: number;
    totalAmount: number;
    totalAmountDue: number;
    totalAmountPaid: number;
}

export interface ITransaction extends Document {
    loanaccount: number;
    svaccount: number;
    l9payment: number;
    staffsalary: number;
    drivertips: number;
    driverfooding: number;
    extraexpenses: number;
    remarks: string;
    todaybalance: number;
    yesterdaybalance: number;
    todayexpense: number;
    todaydue: number;
    totalbalance: number;
    totaldue: number;
}

