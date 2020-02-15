const mongoose=require("mongoose");

const WebHook=mongoose.Schema({
    name:String,
    payload:Object,
    addedby:String,
    hobby:String
},{
    timestamps:true
});

module.exports=mongoose.model('WebHook',WebHook);