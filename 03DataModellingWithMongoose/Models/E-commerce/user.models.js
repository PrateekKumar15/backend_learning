import mongoose from "mongoose"

const userSchema = new mongose.Schema({
  username: {
    type: string,
    required: true,
    unique: true,
    lowercase: true
  },
  email:{
    type: string,
    required: true,
    unique: true,
    lowercase: true
  },
  password{
    type: string,
    required: true,
    
  }
},{
  timestamps: true
})
export const USer = mongoose.model("User",userSchema)