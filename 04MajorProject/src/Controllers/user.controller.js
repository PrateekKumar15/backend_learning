import { ApiError } from "../utils/apiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary}  from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async(req,res)=> {
//   get user details from frontend
// Validation - not empty
//   check if user already exists : (username, emails)
// check for images, check for avatar
// upload them to Cloudinaery, avatar
// crate user object - create entry in db
//  remove password and refresh token field from response
// check from user response return response

const {fullName, email, username,password} =  req.body
console.log("email",email);

if (
    [fullName,email,username,password].some((field)=> field?.trim() ==="")
){
    throw new ApiError(400,"All fields are required")
}

const existedUser=User.findOne({
    $or: [{username},{email}]
})
if(existedUser){
    throw new ApiError(409,"User with email or username already exists")
    }

    const avatarLocalPath =req.files?.avatar[0]?.path;
    const coverImageLocalPath =req.files?.coverImage[0]?.path;
if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
}

const avatar = await uploadOnCloudinary(avatarLocalPath)

const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
    throw new ApiError(400,"Avatar upload failed")
}

const user = User.create ({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
) // by default everything is selected to remove those fields we have to use this string with - sign before the fileds we want to remove 

if(!createdUser){
    throw new ApiError(500,"Something Went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully")
)

})
export {registerUser}