const productSchema=require("../models/Product");

exports.getProduct=async(req,res)=>{
       try {
          const products=await productSchema.find({});
          return res.status(200).json({
                    success:true,
                    message:"Product Fetched Successfully",
                    products
          })
          
       } catch (error) {
          return res.status(500).json({
                    success:false,
                    message:error.message
          })
       }

}
exports.AddProduct=async(req,res)=>{
          try {
                    
          } catch (error) {
                    
          }
}