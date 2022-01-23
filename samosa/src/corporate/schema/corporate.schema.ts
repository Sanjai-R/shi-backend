import * as mongoose from 'mongoose';

export const CorporateSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile_number: {
    type: String,
    required: true,
    maxlength: 12,
    minlength: 10,
  },
  company_name: {
    type: String,
    required: true,
    unique: true,
  },
  company_website: {
    type: String,
  },
  company_logo: {
    type: String,
  },
  company_address: {
    type: String,
  },
});
