"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const BaseService_1 = require("../policies/BaseService");
const db_1 = require("../models/db");
class CustomerService extends BaseService_1.default {
    constructor() {
        super();
        this.registerACustomer = async (customer) => {
            try {
                const { mainAadhaar, familyAadhaar } = customer;
                let existCustomer = await db_1.db.Customers.findOne({ "mainAadhaar": mainAadhaar }).exec();
                let existfamily = await db_1.db.Customers.findOne({ "familyAadhaar": familyAadhaar }).exec();
                if (!this._.isNil(existCustomer) || !this._.isNil(existfamily))
                    throw "Customer or family registered , Try to find user using main aadhaar No ";
                const enc = { ...customer };
                let result = await db_1.db.Customers.create(enc);
                return this.RESP("success", "registered successfully", { result });
            }
            catch (error) {
                throw error;
            }
        };
        this.updateCustomer = async (value) => {
            try {
                const { _id } = value.data;
                const query = { "_id": _id };
                const option = { new: true };
                console.log("data", _id, value.data);
                const result = await db_1.db.Customers.findOneAndUpdate(query, value.data, option);
                if (result) {
                    return this.RESP("success", "customer data updated successfully", result);
                }
            }
            catch (error) {
                throw error;
            }
        };
        this.findCustomer = async (data) => {
            try {
                const { findkey, mainAadhaar, mobile, consumerNo, regNo } = data;
                let options = {};
                if (findkey === "mainAadhaar") {
                    options = { mainAadhaar: mainAadhaar };
                }
                else if (findkey === "mobile") {
                    options = { mobile: mobile };
                }
                else if (findkey === "consumerNo") {
                    options = { consumerNo: consumerNo };
                }
                else if (findkey === "regNo") {
                    options = { regNo: regNo };
                }
                else {
                    options = { mainAadhaar: mainAadhaar };
                }
                let result = await db_1.db.Customers.findOne(options).exec();
                if (this._.isNil(result))
                    throw ("customer not found");
                //@ts-ignore
                if (result == null)
                    throw "Customer not found";
                return this.RESP("success", "customer found successfully", result);
            }
            catch (error) {
                throw error;
            }
        };
        this.statsData = async (startDateISO, endDateISO) => {
            try {
                const result = await db_1.db.Customers.aggregate([
                    {
                        $match: {
                            createdAt: {
                                $gte: startDateISO.toDate(),
                                $lt: endDateISO.toDate(),
                            },
                        },
                    },
                    {
                        $group: {
                            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "+05:30" } },
                            customers: { $push: "$$ROOT" },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            join_date: "$_id",
                            customers: 1,
                        },
                    },
                    { $sort: { join_date: -1 } },
                ]);
                return result;
            }
            catch (error) {
                throw error;
            }
        };
        this.statsByAgent = async (agent) => {
            try {
                const { mainAgent } = agent;
                const result = await db_1.db.Customers.aggregate([
                    {
                        $match: {
                            "mainAgent": mainAgent
                        },
                    },
                ]);
                return result;
            }
            catch (error) {
                throw error;
            }
        };
        this.getLiveStats = async (data) => {
            try {
                const result = {
                    userCount: 1,
                    CustomerCount: 1,
                    agentCount: 1
                };
                result.userCount = await db_1.db.Users.estimatedDocumentCount();
                result.CustomerCount = await db_1.db.Customers.estimatedDocumentCount();
                result.agentCount = await db_1.db.Agent.estimatedDocumentCount();
                return result;
            }
            catch (error) {
                throw error;
            }
        };
        this.deleteCustomerdata = async (Id) => {
            try {
                //@ts-ignore
                let existCustomer = await db_1.db.Customers.findOne({ "_id": Id }).exec();
                console.log("id", existCustomer);
                if (this._.isNil(existCustomer)) {
                    throw "Customer not found";
                }
                //@ts-expect-error
                const trashCustomer = { "date": existCustomer.date, "mainAadhaar": existCustomer.mainAadhaar, "name": existCustomer.name, "remarks": existCustomer.remarks, "docsReturnDate": existCustomer.docsReturnDate, "familyAadhaar": existCustomer.familyAadhaar, "subAgent": existCustomer.subAgent, "mobile": existCustomer.mobile, "mainAgent": existCustomer.mainAgent,
                };
                //@ts-ignore
                let trashResult = await db_1.db.trashUsers.create(trashCustomer);
                console.log("trash -res", trashResult);
                let result = await db_1.db.Customers.findByIdAndRemove(Id).exec();
                console.log("remove", result);
                if (result.name == null)
                    throw "customer not found";
                console.log(result);
                return this.RESP("success", "customer deleted successfully", result);
                //}
            }
            catch (error) {
                throw error;
            }
        };
        this.getCustomerlist = async (page, limit) => {
            const skipIndex = (page - 1) * limit;
            try {
                const result = await db_1.db.Customers.find()
                    .limit(limit)
                    .skip(skipIndex)
                    .exec();
                return this.RESP("success", "Fetched customer details successfully", result);
            }
            catch (error) {
                throw error;
            }
        };
        this.getTrashCustomer = async () => {
            try {
                const result = await db_1.db.trashUsers.find();
                return this.RESP("success", "Fetched all trash customer details successfully", result);
            }
            catch (error) {
                throw error;
            }
        };
        this.uploadUserPhoto = async (data, url) => {
            try {
                const { photo_key } = data;
                const result = await db_1.db.Customers.findOne({ "mainAadhaar": data.mainAadhaar }, { new: true });
                const query = { "_id": result._id };
                const option = { new: true };
                if (photo_key === "InstalationLetter") {
                    await db_1.db.Customers.findOneAndUpdate(query, { $set: { InstalationLetter: url } }, option);
                }
                else if (photo_key === "satisfactionLetter") {
                    await db_1.db.Customers.findOneAndUpdate(query, { $set: { satisfactionLetter: url } }, option);
                }
                else {
                    await db_1.db.Customers.findOneAndUpdate(query, { $set: { otherLetter: url } }, option);
                }
                return this.RESP("success", "Customer photo uploaded successfully");
            }
            catch (error) {
                console.log("error", error);
                throw error;
            }
        };
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map