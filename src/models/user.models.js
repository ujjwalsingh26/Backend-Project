import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

//to use bcrypt and jwt we need to use a special mongoose hooks i.e., "Pre" (before saving any data if we want to do some special work we can use pre hook)

const userSchema = new Schema(
  {
    username:{
      type:String,
      required:true,
      unique:true,
      trim:true,
      index:true
    },
    email:{
      type:String,
      required:true,
      unique:true,
      trim:true,
    },
    fullName:{
      type:String,
      required:true,
      trim:true,
      index:true
    },
    avatar:{
      type:String, //cloudinary url
      required:true
    },
    coverImage:{
      type:String, //cloudinary url
    },
    watchHistory: [
      {
        type:Schema.Types.ObjectId,
        ref:"Video"
      }
    ],
    password:{
      type:String,
      required:[true,'Password is required']
    },
    refreshToken:{
      type:String
    }
  },
  {
    timestamps:true
  }
)

//pre ek middleware hai isliye next ka use krte hai
//bcrypt.hash(variable to be used,no. of round of encryption)
userSchema.pre("save",async function (next) {
  //problem yeh tha ki kuch  bi modifie krne pe ye function chalene lagega parr bass password ke liye use krna hai isliye checking kr liya using if 
  if(!this.isModified("password")) return next()

  this.password = bcrypt.hash(this.password,10)
  next()
})

userSchema.methods.isPasswordCorrect = async function(password){
  return  await bcrypt.compare(password,this.password)
}

//using jwt token
userSchema.methods.generateAccessToken = function () {
  //generating access token
  return jwt.sign(
    //payload
    {
      _id:this._id,
      email:this.email,
      username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:ACCESS_TOKEN_EXPIRY
    }
  )
}

userSchema.methods.generateRefreshToken = function () {
  //generating refreash token
  return jwt.sign(
    //payload
    {
      _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model("User",userSchema);


//for encryption and decryption of our password we will use "bcrypt" package and "jwt" token
