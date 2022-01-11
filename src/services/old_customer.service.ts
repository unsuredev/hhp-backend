import BaseService from "../policies/BaseService";
import { ICustomer } from "../models/dbTypes";
import { db } from "../models/db";

export class OldCustomerService extends BaseService {
  constructor() {
    super();
  }


  updateCustomer = async (value: any) => {
    try {
      const { _id } = value.data
      const query = { "_id": _id }
      const option = { new: true }
      console.log("data", _id, value.data)
      const result = await db.OldCustomers.findOneAndUpdate(query, value.data, option);
      if (result) {
        return this.RESP("success", "customer data updated successfully", result);
      }
    } catch (error) {
      throw error;
    }
  };




  findCustomer = async (data) => {
    try {
      const {findkey , mainAadhaar , mobile,consumerNo ,regNo} =data
      let options = {};
      if (findkey === "mainAadhaar") {
        options = { mainAadhaar: mainAadhaar };
      } else if (findkey === "mobile") {
        options = { mobile: mobile };
      } else if (findkey === "consumerNo") {
        options = { consumerNo: consumerNo };
      }
      else if (findkey === "regNo") {
        options = { regNo: regNo };
      } else {
        options = { mainAadhaar: mainAadhaar };
      }
      let result = await db.OldCustomers.find(options).exec();
      if (this._.isNil(result)) throw("customer not found")

      //@ts-ignore
      if (result == null) throw "Customer not found";
      return this.RESP("success", "customer found successfully", result);
    } catch (error) {
      throw error;
    }
  };
  findSingleCustomer = async (data) => {
    try {
      const {findkey , mainAadhaar , mobile,consumerNo ,regNo} =data
      let options = {};
      if (findkey === "mainAadhaar") {
        options = { mainAadhaar: mainAadhaar };
      } else if (findkey === "mobile") {
        options = { mobile: mobile };
      } else if (findkey === "consumerNo") {
        options = { consumerNo: consumerNo };
      }
      else if (findkey === "regNo") {
        options = { regNo: regNo };
      } else {
        options = { mainAadhaar: mainAadhaar };
      }
      let result = await db.OldCustomers.findOne(options).exec();
      if (this._.isNil(result)) throw("customer not found")
      //@ts-ignore
      if (result == null) throw "Customer not found";
      return this.RESP("success", "Customer found successfully", result);
    } catch (error) {
      throw error;
    }
  };



  statsData = async (startDateISO, endDateISO) => {
    try {
      const result = await db.OldCustomers.aggregate([
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
    } catch (error) {
      throw error;
    }
  };






  getLiveStats = async (data: any) => {
    try {
      const result = {
        CustomerCount: 1,
      };
      // result.userCount = await db.Users.estimatedDocumentCount();
      result.CustomerCount = await db.OldCustomers.estimatedDocumentCount();
      // result.agentCount = await db.Agent.estimatedDocumentCount()
      return result;
    } catch (error) {
      throw error;
    }
  };

  deleteCustomerdata = async (Id: string) => {
    try {
      //@ts-ignore
      let existCustomer = await db.OldCustomers.findOne({ "_id": Id }).exec();
      console.log("id", existCustomer)
      if (this._.isNil(existCustomer)) {
        throw "Customer not found";
      }
        let result = await db.OldCustomers.findByIdAndRemove(Id).exec();
        if (result.name == null) throw "customer not found";
        return this.RESP("success", "customer deleted successfully", result);
      //}
    } catch (error) {
      throw error;
    }
  }




  getCustomerlist = async (page, limit) => {
    const skipIndex = (page - 1) * limit;
    try {
      const result = await db.OldCustomers.find()
      .limit(limit)
      .skip(skipIndex)
      .exec();
      return this.RESP("success", "Fetched customer details successfully", result);
    } catch (error) {
      throw error;
    }
  }




}
