const {Schema,model}=require('mongoose')

const listSchema=new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    email:{
        type:String,
    },
    title:{
        type:String,
        required:true,
        trim:true,
        maxlength:100
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:1000
    },
    datetime:{
        type:Date,
        required:true,
    }

},{
    timestamps:true
})

const List=model('List',listSchema)
module.exports=List

