// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const app = express();

// // const port = 8000

// // app.use(bodyParser.json());

// // let users = []

// // // path = GET /test
// // app.get('/test', (req, res) => {
// //     let user ={
// //         name: 'John Doe',
// //         age: 30,
// //         email: 'john.doe@example.com'
// //     }
// //     res.json(user);
// // });

// // // path = POST /user
// // app.post('/user', (req, res) => {
// //     let user = req.body; 
// //     users.push(user);
// //     res.json({
// //         message: 'User added successfully',
// //         user: user
// //     });
// // });


// // app.listen(port, () => {
// //     console.log(`Server is running on port ${port}`)
// // });
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();

// const port = 8000

// app.use(bodyParser.json());

// let users = []

// // path = GET /test
// app.get('/test', (req, res) => {
//     let user ={
//         name: 'John Doe',
//         age: 30,
//         email: 'john.doe@example.com'
//     }
//     res.json(user);
// });
// app.get('/users', (req, res) => {
//     res.json(users);
// });
// // path = POST /user
// app.post('/user', (req, res) => {
//     let user = req.body; 
//     users.push(user);
//     res.json({
//         message: 'User added successfully',
//         user: user
//     });
// });


// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`)
// });
const express = require('express');
const bodyParser = require('body-parser');
const mysql =require('mysql2/promise')
const app = express();

const port = 8000

app.use(bodyParser.json());

let users = []
let counter = 1;


let conn=null
const initDBConnection = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'root',
        database: 'webdb',
        port:8821
    })   
}


//path = get /user สำหรับ get ข้อมูล user ทั้งหมด
app.get('/users', async (req,res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
})

// path = GET /test
app.get('/test', (req, res) => {
    let user ={
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com'
    }
    res.json(user);
});
app.get('/users', (req, res) => {
    res.json(users);
});
// path = POST /user
app.post('/users',async(req,res) =>{
    let user = req.body;
    const results = await conn.query('INSERT INTO users SET ?',user);
    res.json({
        message: 'User created suscessfully',
        data: results[0]
    });
})

// path = PUT /user/:id
app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    let updateUser =req.body;
    //หา  user จาก id ที่ส่งมา
    let seletedIndex = users.findIndex(user => user.id == id);


    //อัพเดตข้อมูล user
   if (updateUser.name){
        users[seletedIndex].name = updateUser.name;
   }
   if (updateUser.email){
    users[seletedIndex].email = updateUser.email;
   }


    //เอาข้อมูลที่ update ส่ง response กลับไป
    res.json({
        message:'Userupdate successfully',
        data:{
            users:updateUser,
            indexUpdate: seletedIndex
        }
    })


});
app.delete('/user/:id',(req , res) => {
    let id = req.params.id;

    let seletedIndex = users.findIndex(user => user.id == id);
    users.splice(seletedIndex,1);
})

app.listen(port,async () => {
    await initDBConnection();
    console.log(`Server is running on port ${port}`)
});