import { Schema, SchemaOptions } from "mongoose";
import { date, number, object } from "@hapi/joi";

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
    address: {
      type: String,
      required: true,
    },

  },
  { timestamps: true
  }
);



export  {
    AgentSchema
}
