const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api_rt = require('./routes/api-rt');
const teacher_rt = require('./routes/teacherlogin-rt');
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(cors()); 
app.use('/teacher', teacher_rt);
app.use('/api', api_rt);
app.get('/*', (req, res)=>{
    res.status(404).sendFile(__dirname+'/NotFound.html')
})

app.listen(port, () =>{
    console.log(`server started on http://localhost:${port}`);
});
