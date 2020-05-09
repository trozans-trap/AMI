var mongoose = require('mongoose');

var ServerSchema  = new mongoose.Schema ({
    name:{
        type: String,
    },
    email:{
        type:String ,  
       },
    username:{
        type:String ,
    },
    password:{
        type:String ,
    },
    phone:{
        type:String,  
       },
    city:{
        type:String,  
    },
    state:{
        type:String,  
    }
})

const Server = mongoose.model('Users',ServerSchema);
module.exports = Server;