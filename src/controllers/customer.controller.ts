import BaseController from "../policies/BaseController";
import { Request, Response, NextFunction as Next } from "express";
import * as Joi from "@hapi/joi";
import { CustomerService } from "../services/customer.service";
import * as moment from "moment";

export class CustomerController extends BaseController {
  constructor(private customerService: CustomerService = new CustomerService()) {
    super();
  }

  private customerJoiSchema = Joi.object()
    .keys({
      name: Joi.string().required(),
      mobile: Joi.string().required(),
      mainAadhaar: Joi.string().required(),
      familyAadhaar: Joi.string().required(),
      consumerNo: Joi.string().optional().empty(""),
      mainAgent: Joi.string().required(),
      subAgent: Joi.string().optional().empty(""),
      remarks: Joi.string().optional().empty(""),
      regNo: Joi.string().optional().empty(""),
      addedBy: Joi.string().optional().empty(""),
    })
    .required();

  private cutomerUpdateJoiSchema = Joi.object()
    .keys({
      name: Joi.string().optional().empty(""),
      mobile: Joi.string().optional().empty(""),
      mainAadhaar: Joi.string().optional().empty(""),
      familyAadhaar: Joi.string().optional().empty(""),
      consumerNo: Joi.string().optional().empty(""),
      mainAgent: Joi.string().optional().empty(""),
      subAgent: Joi.string().optional().empty(""),
      remarks: Joi.string().optional().empty(""),
      regNo: Joi.string().optional().empty(""),
    })
    .required();

  private statsDataJoiSchema = Joi.object().keys({
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    override_cache: Joi.boolean().default(true),
  });

  private agentJoiSchema = Joi.object().keys({
    mainAgent: Joi.string().required(),
    override_cache: Joi.boolean().default(true),
  });


  registerACustomer = async (req: Request, res: Response, next: Next) => {
    try {
      // const decryptedData = req.decryptedData;
      // const value = await this.customerJoiSchema.validateAsync(decryptedData, this.joiOptions);
      const result = await this.customerService.registerACustomer(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(this.ERR({
        status: "failed",
        message: "Bad input!,Check consumer details ",
        errorMessage: error.message
      }, error));
    }
  }

  //finding a customer from DB
  searchCustomer = async (req: Request, res: Response, next: Next) => {
    try {
      // const value = await this.cutomerUpdateJoiSchema.validateAsync(req.body);
      let result = await this.customerService.findCustomer(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(this.ERR({
        status: "failed",
        message: "Unable to find Consumer",
        errorMessage: error.message
      }, error));
    }
  };

  customerStatsData = async (req: Request, res: Response, next: Next) => {
    try {
      const validatedData = req.body
      const startDateISO = moment(validatedData.start_date);
      const endDateISO = moment(validatedData.end_date).endOf("day"); // Timezone issue
      const result = await this.customerService.statsData(startDateISO, endDateISO);
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(400).json(this.ERR({
        status: "failed",
        message: "Unable to find Consumers data ",
        errorMessage: error.message
      }, error));
    }
  }
  customerByAgent = async (req: Request, res: Response, next: Next) => {
    try {
      // const agentName = await this.agentJoiSchema.validateAsync(req.body, this.joiOptions);
      const result = await this.customerService.statsByAgent(req.body);
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(400).json(this.ERR({
        status: "failed",
        message: "Unable to find Consumer list ",
        errorMessage: error.message
      }, error));
    }
  };

//pending customer list 
  pendingCustomer = async (req: Request, res: Response, next: Next) => {
    try {
      // const agentName = await this.agentJoiSchema.validateAsync(req.body, this.joiOptions);
      const result = await this.customerService.pendingCustomer(req.body);
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(400).json(this.ERR({
        status: "failed",
        message: "Unable to find pending Consumer list ",
        errorMessage: error.message
      }, error));
    }
  };


//all new customer list 
allNewCustomer = async (req: Request, res: Response, next: Next) => {
  try {
    // const agentName = await this.agentJoiSchema.validateAsync(req.body, this.joiOptions);
    const result = await this.customerService.NewCustomer(req.body);
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(400).json(this.ERR({
      status: "failed",
      message: "Unable to find pending Consumer list ",
      errorMessage: error.message
    }, error));
  }
};

//all only customer list 
onlyConsumerlist = async (req: Request, res: Response, next: Next) => {
  try {
    // const agentName = await this.agentJoiSchema.validateAsync(req.body, this.joiOptions);
    const result = await this.customerService.onlyConsumer(req.body);
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(400).json(this.ERR({
      status: "failed",
      message: "Unable to find pending Consumer list ",
      errorMessage: error.message
    }, error));
  }
};




  getLiveStats = async (req: Request, res: Response) => {
    try {
      const result = await this.customerService.getLiveStats(req.body);
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(400).json(this.ERR({
        status: "failed",
        message: "Unable to get live stats ",
        errorMessage: error.message
      }, error));
    }
  };

  // update customer
  updateCustomer = async (req: Request, res: Response, next: Next) => {
    try {

      const { _id } = req.body
      // const value = await this.cutomerUpdateJoiSchema.validateAsync(req.body, this.joiOptions);
      let result = await this.customerService.updateCustomer(req.body)
      return res.status(200).json({ data: result });
    } catch (error) {
      console.log("eror" , error)
      return res.status(400).json(
        this.ERR(
          {
            status: 'failed',
            message: 'unable to upload photo',
            errorMessage: error.message
          },
          error
        )
      );
    }
  }





  deleteCustomer = async (req: Request, res: Response, next: Next) => {
    try {
      let { customerId } = req.body;
      let result = await this.customerService.deleteCustomerdata(customerId);
      return res.send(result);
    } catch (error) {
      return res.status(400).json(this.ERR({
        status: "failed",
        message: "Unable to delete consumer",
        errorMessage: error.message
      }, error));
    }
  };


  getAllCustomer = async (req: Request, res: Response) => {
    //@ts-ignore
    const page = parseInt(req.query.page);
        //@ts-ignore
    const limit = parseInt(req.query.limit);
    try {

      const result = await this.customerService.getCustomerlist(page, limit)
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(this.ERR({
        status: "failed",
        message: "Unable to get live stats ",
        errorMessage: error.message
      }, error));
    }
  };



  getAllTrashCustomer = async (req: Request, res: Response) => {
    try {
      const result = await this.customerService.getTrashCustomer()
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(this.ERR({
        status: "failed",
        message: "Unable to get trash customers stats ",
        errorMessage: error.message
      }, error));
    }
  };



  uploadUserPhoto = async (req: Request, res: Response, next: Next) => {
    try {
      // @ts-ignore
      if (req.file && req.file.s3_url) {
        // @ts-ignore
        const ImageUrl = req.file.s3_url
        //@ts-ignore
        const aadhaar= req.body
        const result = await this.customerService.uploadUserPhoto( aadhaar ,ImageUrl)
        // @ts-ignore
        return res.status(200).json({
          status: 'success',
          message: 'Customer photo uploaded successfully!',
          // @ts-ignore
          data: { image_url: req.file.s3_url }
        })
      }
      // @ts-ignore
      if (req.file.cloudStorageError) {
        return res.status(400).json({
          status: 'failed',
          message: 'file uploading failed',
          data: {}
        })
      }
    } catch (error) {

      return res.status(400).json(
        this.ERR(
          {
            status: 'failed',
            message: 'unable to upload photo',
            errorMessage: error.message
          },
          error
        )
      )
    }
  }


  uploadOldUserPhoto = async (req: Request, res: Response, next: Next) => {
    try {
      // @ts-ignore
      if (req.file && req.file.s3_url) {
        // @ts-ignore
        const ImageUrl = req.file.s3_url
        //@ts-ignore
        const aadhaar= req.body
        const result = await this.customerService.uploadOldUserPhoto( aadhaar ,ImageUrl)
        // @ts-ignore
        return res.status(200).json({
          status: 'success',
          message: 'Old Customer photo uploaded successfully!',
          // @ts-ignore
          data: { image_url: req.file.s3_url }
        })
      }
      // @ts-ignore
      if (req.file.cloudStorageError) {
        return res.status(400).json({
          status: 'failed',
          message: 'file uploading failed',
          data: {}
        })
      }
    } catch (error) {

      return res.status(400).json(
        this.ERR(
          {
            status: 'failed',
            message: 'unable to upload photo',
            errorMessage: error.message
          },
          error
        )
      )
    }
  }





}
