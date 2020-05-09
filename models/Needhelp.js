var mongoose = require('mongoose');

var ServerSchema  = new mongoose.Schema ({
    name:{
        type: String,
    },
    city:{
        type:String,  
    },
    state:{
        type:String,  
    },
    helptype:{
        type:String,  
    },
    item:{
        type:String,  
    }
})

const Server = mongoose.model('Users',ServerSchema);
module.exports = Server;