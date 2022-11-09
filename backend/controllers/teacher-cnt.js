const mongoose = require('mongoose');
const bodyParser = require('body-parser');

module.exports.login = async (request, response) => {    
    const {email, pass} = request.body
    console.log(email,pass);
    
    const uri = 'mongodb+srv://admin:admin@resultmanagement.tyifu51.mongodb.net/teacher-credentials?retryWrites=true&w=majority'
    const checkCon = mongoose.createConnection(uri);
    const teachermodel = checkCon.model('modelname', mongoose.Schema({email: {type: String},password: {type: String}}), 'credentials')
    
    await teachermodel.findOne({'email':email,'password':pass})
    .then((res) =>{
        if(res == null){
            response.json({message:'teacherNotFound'})
        }else{
            response.json({message:'teacherFound'})
        }
        console.log(res)
    })
    .catch((err) =>{console.log(err.message)})
};
