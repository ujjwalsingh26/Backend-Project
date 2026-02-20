import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile:{
      type:Strinf, //cloudinary url
      required:true,
    },
    thumbnail:{
      type:String, //cloudinary url
      required:true,
    },
    title:{
      type:String, 
      required:true,
    },
    description:{
      type:String, 
      required:true,
    },
    duration:{
      type:Number, //cloudinary url
      required:true,
    },
    views:{
      type:Number,
      default:0, 
    },
    isPublished:{
      type:Boolean,
      default:true
    },
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User"
    }
  },
  {timestamps:true}
)

//we need to first import mongoose-aggregate package then use before export statement

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema);

//to show the user's history we need to use a special package from mongoose i.e., "mongoose-aggregate-paginate-v2" used to 