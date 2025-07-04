import { ApiError } from "../utils/apiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {uploadonCloudinary}  from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const generateAccessAndRefreshToken = async (userId)=> {
    try{
        const user = await User.findById(userId);const accessToken = User.generateAccessToken();const refreshToken =user.generateRefreshToken();
        user.refreshToken = refreshToken;await user.save({validateBeforeSave:false});
        return {accessToken,refreshToken};
        
    }catch(error){
        throw new ApiError(500,"Something went wrong while generating the tokens");   

    }
}
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
// console.log("email",email);

if (
    [fullName,email,username,password].some((field)=> field?.trim() ==="")
){
    throw new ApiError(400,"All fields are required")
}

const existedUser= await User.findOne({
    $or: [{username},{email}]
})
if(existedUser){
    throw new ApiError(409,"User with email or username already exists")
    }
    const avatarLocalPath =req.files?.avatar[0]?.path


    // console.log(req.files.avatar); // structure of avatar is like a object in a array


    // const coverImageLocalPath =req.files?.coverImage[0]?.path;
let coverImageLocalPath;
if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
    coverImageLocalPath =req.files.coverImage[0].path;
}


if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
}
// console.log(avatarLocalPath)
const avatar = await uploadonCloudinary(avatarLocalPath);   
// console.log(avatar);
const coverImage = await uploadonCloudinary(coverImageLocalPath);

if(!avatar){
    throw new ApiError(400,"Avatar upload failed")
}

const user = await User.create ({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
})
// console.log(user)

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


const loginUser =  asyncHandler(async(req,res)=>{
//  request body -> data
//  username or email
// find the user 
// password check
//  if user is found and password is correct 
//  create refresh and access token
// send cookie 

const {email,username,password} = req.body

console.log(req.body)
if (!username || !email){
    throw new ApiError(400,"Username or Email is required");

} 

const user = await User.findOne({
    $or: [{email}, {username}]
})

if(!user){
    throw new ApiError(404,"User doesn't exist")
}

const isPasswordValid = await user.isPasswordCorrect(password);
if(!isPasswordValid){
    throw new ApiError(401,"Invalid user Credentials")
};

const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)


})


export {registerUser,loginUser}