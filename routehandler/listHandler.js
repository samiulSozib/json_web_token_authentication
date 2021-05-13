const router=require('express').Router()
const List=require('../models/List')
const ckLogin=require('../middleware/checkLogin')

router.get('/all_list',ckLogin,async(req,res,next)=>{
    try{
        let lists=await List.find()
        res.status(200).json({
            Lists:lists
        })
    }catch(e){
        console.log(e)
        next(e)
    }
})


module.exports=router