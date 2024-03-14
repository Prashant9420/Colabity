import { asyncHandler } from "../utils/asyncHandler.js";
import { Doc } from "../models/doc.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllDocs = asyncHandler(async (req, res) => {
  const allDocs = await Doc.find({ owner: req.user._id });
  console.log(allDocs);
  return res.status(200).json(new ApiResponse(200, "documents found", allDocs));
});

const saveDoc = asyncHandler(async (req, res) => {
  const {filename,content}=req.body;
  const savedDoc = await Doc.create({
    filename,
    content,
    owner:req.user._id
  })
  if(!savedDoc){
    throw new ApiError(401,"something went wrong while saving the code");
  }
  return res.status(200).json(new ApiResponse(200, "Code Saved Successfully"));
});

const deleteDoc = asyncHandler(async(req,res)=>{
  const {docId}=req.body;
  console.log(docId);
  const result = await Doc.deleteOne({_id:docId});
  if(!result){
    throw new ApiError(409,"something went wrong while deleting the document");
  }
  return res.status(200).json(new ApiResponse(200,"file deleted successfully"));
})

export {saveDoc,getAllDocs,deleteDoc}
