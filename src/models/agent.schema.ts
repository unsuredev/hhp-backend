import { Schema, SchemaOptions } from "mongoose";

const schemaOptions: SchemaOptions = {
  timestamps: true,
  versionKey: false,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
};
 const AgentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile :{
    type: String,
    unique:true,
      required: true,
    },
    email:{
      type:String
    },
    address: {
      type: String,
      required: true,
    },
    active:{
      type:Boolean,
      default: true
    }

  },
  { timestamps: true
  }
);



export  {
    AgentSchema
}
