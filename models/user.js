const { Schema, model }=require('mongoose')

const userSchema=new Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},{
    timestamps:true
})

const User=model('jwt_user',userSchema)
module.exports=User