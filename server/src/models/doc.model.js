import mongoose from 'mongoose'
const DocSchema=new mongoose.Schema({

    filename:{
        type:"string",
        required:true,
        unique:true
    },
    content:{
        type:"string",
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
})

export const Doc = mongoose.model("Doc",DocSchema)