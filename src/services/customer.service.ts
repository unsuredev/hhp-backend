import BaseService from "../policies/BaseService";
import { ICustomer } from "../models/dbTypes";
import { db } from "../models/db";

export class CustomerService extends BaseService {
  constructor() {
    super();
  }
  registerACustomer = async (customer: ICustomer) => {
    try {
      const { mainAadhaar , familyAadhaar} = customer
      let existCustomer = await db.Customers.findOne({ "mainAadhaar": mainAadhaar}).exec();
      let existfamily = await db.Customers.findOne({"familyAadhaar": familyAadhaar }).exec();
      if (!this._.isNil(existCustomer) || !this._.isNil(existfamily) ) throw "Customer or family registered , Try to find user using main aadhaar No ";
      const enc = { ...customer };
      let result = await db.Customers.create(enc)
      return this.RESP("success", "registered successfully", { result });
    } catch (error) {
      throw error;
    }
  };


  updateCustomer = async (value: any) => {
    try {
      const { _id } = value.data
      const query = { "_id": _id }
      const option = { new: true }
      console.log("data", _id, value.data)
      const result = await db.Customers.findOneAndUpdate(query, value.data, option);
      if (result) {
        return this.RESP("success", "customer data updated successfully", result);
      }
    } catch (error) {
      throw error;
    }
  };




  findCustomer = async (data) => {
    try {
      const {findkey , mainAadhaar , mobile,consumerNo ,regNo , familyAadhaar} =data
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
      }
      else if (findkey === "familyAadhaar") {
        options = { familyAadhaar:familyAadhaar };
      }
      else {
        options = { mainAadhaar: mainAadhaar };
      }

      let result = await db.Customers.findOne(options).exec();
      if (this._.isNil(result)) throw("customer not found")

      //@ts-ignore
      if (result == null) throw "Customer not found";
      return this.RESP("success", "customer found successfully", result);
    } catch (error) {
      throw error;
    }
  };


  statsData = async (startDateISO, endDateISO) => {
    try {
      const result = await db.Customers.aggregate([
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




  statsByAgent = async (agent: any) => {
    try {
      const { mainAgent } = agent
      const result = await db.Customers.aggregate([
        {
          $match: {
            "mainAgent": mainAgent
          },
        },
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  };




  getLiveStats = async (data: any) => {
    try {
      const result = {
        userCount: 1,
        CustomerCount: 1,
        agentCount: 1
      };
      result.userCount = await db.Users.estimatedDocumentCount();
      result.CustomerCount = await db.Customers.estimatedDocumentCount();
      result.agentCount = await db.Agent.estimatedDocumentCount()
      return result;
    } catch (error) {
      throw error;
    }
  };

  deleteCustomerdata = async (Id: string) => {
    try {
      //@ts-ignore
      let existCustomer = await db.Customers.findOne({ "_id": Id }).exec();
      console.log("id", existCustomer)
      if (this._.isNil(existCustomer)) {
        throw "Customer not found";
      }
      //@ts-expect-error
        const trashCustomer = { "date": existCustomer.date, "mainAadhaar": existCustomer.mainAadhaar,"name": existCustomer.name, "remarks": existCustomer.remarks, "docsReturnDate": existCustomer.docsReturnDate,"familyAadhaar": existCustomer.familyAadhaar,"subAgent": existCustomer.subAgent,"mobile": existCustomer.mobile, "mainAgent": existCustomer.mainAgent,
        }
        //@ts-ignore
        let trashResult = await db.trashUsers.create(trashCustomer)
        console.log("trash -res", trashResult)
        let result = await db.Customers.findByIdAndRemove(Id).exec();
        console.log("remove", result)
        if (result.name == null) throw "customer not found";
        console.log(result)
        return this.RESP("success", "customer deleted successfully", result);
      //}
    } catch (error) {
      throw error;
    }
  }




  getCustomerlist = async (page, limit) => {
    const skipIndex = (page - 1) * limit;
    try {
      const result = await db.Customers.find()
      .limit(limit)
      .skip(skipIndex)
      .exec();
      return this.RESP("success", "Fetched customer details successfully", result);
    } catch (error) {
      throw error;
    }
  }




  getTrashCustomer = async () => {
    try {
      const result = await db.trashUsers.find()
      return this.RESP("success", "Fetched all trash customer details successfully", result);
    } catch (error) {
      throw error;
    }
  }


  uploadUserPhoto = async (data, url) => {
    try {
      const { photo_key } = data
      const result = await db.Customers.findOne({ "mainAadhaar": data.mainAadhaar }, { new: true });
      const query = { "_id": result._id }
      const option = { new: true }
      if (photo_key === "InstalationLetter") {
        await db.Customers.findOneAndUpdate(query, { $set: { InstalationLetter: url, installtatus:"Complete" } }, option);
      }
      else if (photo_key === "satisfactionLetter") {
        await db.Customers.findOneAndUpdate(query, { $set: { satisfactionLetter: url } }, option);
      }
      else {
        await db.Customers.findOneAndUpdate(query, { $set: { otherLetter: url } }, option);
      }
      return this.RESP("success", "Customer photo uploaded successfully");
    } catch (error) {
      console.log("error", error)
      throw error;
    }
  };

  uploadOldUserPhoto = async (data, url) => {
    try {
      const { photo_key } = data
      const result = await db.OldCustomers.findOne({ "mainAadhaar": data.mainAadhaar }, { new: true });
      const query = { "_id": result._id }
      const option = { new: true }
      if (photo_key === "InstalationLetter") {
        await db.OldCustomers.findOneAndUpdate(query, { $set: { InstalationLetter: url, installtatus:"Complete" } }, option);
      }

      return this.RESP("success", "Old Customer photo uploaded successfully");
    } catch (error) {
      console.log("error", error)
      throw error;
    }
  };


}
