const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { response, request } = require('express');
dotenv.config();

module.exports.check = async (request, response) => {
    const { year , branch, heldin } = request.body;
    mongoose.set('autoCreate', false)
    
    const uri = `mongodb+srv://admin:admin@resultmanagement.tyifu51.mongodb.net/year-${heldin}?retryWrites=true&w=majority`
    console.log(year, branch, heldin)    
    const checkCon = mongoose.createConnection(uri);
    const checkmodel = checkCon.model('modelname', mongoose.Schema({}), `${year}-${branch}`)
    await checkmodel.findOne()
    .then((res)=>{
        if(res == null){
            console.log('DatabaseNotFound',res)
            response.json({'message':'DatabaseNotFound'})
        }else{
            console.log('DatabaseFound',res)
            response.json({'message':'DatabaseFound'})
        }
    })
    .catch((e)=>{
        console.log(e)
    })
    
};

module.exports.getresults = async (request, response) =>{
    const {year, branch, heldin} = request.body
    if(year && branch && heldin){
        const uri = `mongodb+srv://admin:admin@resultmanagement.tyifu51.mongodb.net/year-${heldin}?retryWrites=true&w=majority`
        const conn = mongoose.createConnection(uri);
        const model = conn.model('modelname', mongoose.Schema({}), `${year}-${branch}`)
        await model.find()
        .then((res) =>{
            response.json(res)
        })
        .catch((err) =>{
            response.json({message: 'unable to fetch'})
        })
    }else{
        response.json({message:'notLoggedin'})
    }
};

module.exports.setdb = async (request, response) =>{
    console.log(request.body)
    const {year, branch, heldin} = request.body;

    const uri = `mongodb+srv://admin:admin@resultmanagement.tyifu51.mongodb.net/year-${heldin}?retryWrites=true&w=majority`
    const checkCon = mongoose.createConnection(uri); 
    checkCon.createCollection(`${year}-${branch}`)
    .then((res) => {
        console.log(res)
        response.json({message: 'CollectionCreated'})
    })
    .catch((err) => {
        if(err.message.includes("exists")){
            response.json({message: 'CollectionCreated'})
        }
        else{
            response.json({message: 'CollectionNotCreated'})

        }
    })
}

module.exports.addresult = async (request, response) =>{
    const {
        name, seatno, 
        exam:{ branch, sem, heldin, year},
        remark, sgpi,
        result:{
            sub1,
            sub2,
            sub3,
            sub4,
            sub5
        }
    } = request.body;

   mongoose.set('autoCreate', false)
   const uri = `mongodb+srv://admin:admin@resultmanagement.tyifu51.mongodb.net/year-${heldin}?retryWrites=true&w=majority`
   const conn = mongoose.createConnection(uri,(errr, sycc) =>{
    if(errr){
        response.json({message:"Database down"})
    }
    }); 
   console.log()
   const model  = conn.model('modelname', mongoose.Schema({}, { strict: false }), `${year}-${branch}`)
   const obj = new model({
    name:name,
    exam:{
        branch:branch,
        sem:sem,
        heldin:heldin,
        year:year
    },
    result:{
        subjects:[sub1[0],sub2[0],sub3[0],sub4[0],sub5[0]],
        marks:[sub1[1],sub2[1],sub3[1],sub4[1],sub5[1]]
    },
    remark:remark,
    sgpi: sgpi,
    seatno:seatno
    })
   obj.save(function(err,succ){
    if (err){
        response.json({message:'ResultNotAdded'})
    }
    else{
        response.json({message:'ResultAdded'})
    }
})
}