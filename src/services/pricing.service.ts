import { INCdelivery, ITransaction } from './../models/dbTypes.d';
import BaseService from "../policies/BaseService";
import { IPricing } from "../models/dbTypes";
import { db } from "../models/db";


export class PricingService extends BaseService {
    constructor() {
        super();
    }
    registerPricing = async (price: IPricing) => {
        try {
            const enc = { ...price };
            let result = await db.Price.create(enc)
            //@ts-ignore
            result = result.toObject();
            return this.RESP("success", "Price registered successfully", { pricing: result });
        } catch (error) {
            throw error;
        }
    };


    getPricingDetails = async () => {
        try {
            let result = await db.Price.find()
            if (this._.isNil(result)) {
                throw new Error("E_CONNECTION_S_10000");
            }
            return this.RESP("success", "Fetched Price details successfully", result);
        } catch (error) {
            throw error;
        }
    }


    updatePricing = async (value) => {
        try {
            const { _id } = value.data
            const query = { "_id": _id }
            const option = { new: true }
            const result = await db.Price.findOneAndUpdate(query, value.data, option);
            return this.RESP("success", "updated pricing  successfully", { pricing: result });
        } catch (error) {
            throw error;
        }
    }


    // REGISTER NC DELIVERY 

    registerNcDelivery = async (value: INCdelivery) => {
        try {
            const enc = { ...value };
            let result = await db.NCdelivery.create(enc)
            //@ts-ignore
            result = result.toObject();
            return this.RESP("success", "NC Delivery registered successfully", { ncdelivery: result });
        } catch (error) {
            throw error;
        }
    };


    // GET NC  

    getNcDelivery = async () => {
        try {
            const result = await db.NCdelivery.find()
            const intallationComplete = await db.Customers.find({ installtatus: "Complete" })
            result[0]['installationComplete'] = intallationComplete.length
            const data = result[0].toObject()
            data['installationComplete'] = intallationComplete.length
            return this.RESP("success", "get NC details  successfully", { NcDetails: data });
        } catch (error) {
            throw error;
        }
    }


    // NC UPDATE 

    updateNcDelivery = async (value) => {
        try {
            const { _id } = value
            const query = { "_id": _id }
            const option = { new: true }
            const result = await db.NCdelivery.findOneAndUpdate(query, value.data, option);
            if (result) {
                const ncData = {
                    "totalLod": result.totalLod,
                    "totalRegulator": result.totalRegulator,
                    "totalPipe": result.totalPipe,
                    "totalBplOven": result.totalBplOven,
                    "totalHpOven": result.totalHpOven,
                    "totalNonHpOven": result.totalNonHpOven,
                    "totalLight": result.totalLight,
                    "totalAmount": result.totalAmount,
                    "totalAmountDue": result.totalAmountDue
                }
                let ncHistory = await db.NCdeliveryHistory.create(ncData)
            }
            return this.RESP("success", "updated pricing  successfully", { pricing: result });
        } catch (error) {
            throw error;
        }
    }



    // GET NC history  

    getAllNcDelivery = async () => {
        try {
            const result = await db.NCdeliveryHistory.find()
            return this.RESP("success", " NC history data successfully", { NcDetails: result });
        } catch (error) {
            throw error;
        }
    }

    //*****************TRANSACTION***************************** */




    // ADD TRANSACTION  
    addTodayTransaction = async (data: ITransaction) => {
        try {
            const result = await db.Transaction.create(data)
            return this.RESP("success", "Transaction added successfully", { transaction: result });
        } catch (error) {
            throw error;
        }
    }


    // GET TRANSACTION  
    getTodayTransaction = async (startDateISO, endDateISO) => {
        try {
            const result = await db.Transaction.findOne({
                _id: "62765bd2be5659d69ee06410",
            });
            const yesterdayInfo:any = await db.TransactionHistory.find().sort({ _id: -1 }).limit(1)
            const TodayAmount = await db.refilSaleHistory.aggregate([
                {
                    $match: {
                        updatedAt: {
                            $gte: startDateISO.toDate(),
                            $lt: endDateISO.toDate(),
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        todayAmountPaid: { $sum: "$totalAmountPaid" },
                        totalAmountSell: { $sum: "$totalAmount" },
                        count: { $sum: 1 },
                    },
                },
            ]);
            console.log("date" ,startDateISO.toDate(),endDateISO.toDate() , TodayAmount )
            const TotalAmount = await db.refilSale.aggregate([
                {
                    $match: {},
                },
                {
                    $group: {
                        _id: null,
                        totalAmountDue: { $sum: "$totalAmountDue" },
                        count: { $sum: 1 },
                    },
                },
            ]);
            const newResult = {
                yesterdaybalance: (yesterdayInfo  && yesterdayInfo.length>0 )?yesterdayInfo[0].todayClosing:0,
                driverfooding:result.driverfooding,
                drivertips:result.drivertips,
                extraexpenses:result.extraexpenses,
                l9payment:result.l9payment,
                loanaccount:result.loanaccount,
                remarks:result.remarks,
                staffsalary:result.staffsalary,
                svaccount:result.svaccount,
                todaybalance:result.todaybalance,
                todayAmountPaid: (TodayAmount && TodayAmount.length>0 && TodayAmount[0].todayAmountPaid)?TodayAmount[0].todayAmountPaid:0,
                todaySellAmount:(TodayAmount && TodayAmount.length>0 && TodayAmount[0].totalAmountSell)? TodayAmount[0].totalAmountSell:0,
                todayDue:(TodayAmount && TodayAmount.length>0 && TodayAmount[0].totalAmountSell)? TodayAmount[0].totalAmountSell-TodayAmount[0].todayAmountPaid:0,
                grandTotalDue:TotalAmount[0].totalAmountDue
            }
            return this.RESP("success", "Transaction details fetched successfully", { transaction: newResult });
        } catch (error) {
            throw error;
        }
    }


    // UPDATE TRANSACTION  
    updateTodayTransaction = async (data:ITransaction) => {
        try {
            const query = {  _id: "62765bd2be5659d69ee06410"}
            const option = { new: true }
            const result = await db.Transaction.findOneAndUpdate(query, data, option);
          await db.TransactionHistory.create(data);
            return this.RESP("success", "Transaction updated successfully", { transaction: result });
        } catch (error) {
            console.log("err", error)
            throw error;
        }
    }


        // HISTORY TRANSACTION  
        todayTransactionHistory = async (data:ITransaction) => {
            try {
                const result = await db.TransactionHistory.find().limit(50);
                return this.RESP("success", "Transaction history get successfully", { transaction: result });
            } catch (error) {
                console.log("err", error)
                throw error;
            }
        }


}
