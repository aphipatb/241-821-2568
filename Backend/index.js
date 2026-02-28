const express = require('express');
const bodyParser = require('body-parser');
const mysql =require('mysql2/promise')
const app = express();

const port = 8000

app.use(bodyParser.json());

let users = []
let counter = 1;



let conn=null
const initDBConnection =async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'root',
        database: 'webdb',
        port:8821
    });
}

app.put('/users/:id', async (req, res) => {
    try{
        let id = req.params.id;
        let user = req.body;
        const result = await conn.query('UPDATE users SET ? WHERE id = ?',[user,id]);
        if (result[0].length == 0) {
            throw {statusCode: 404,message: 'User not found'}
        }
        res.json({
            message: 'User updated succ',
            data:user
        })
    }
    catch (error) {
        console.error('Error',error);
        let statusCode = error.statusCode || 500;
        res.status(500).json({
            message: 'Error getting user',
            error: error
        });
    }
});



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
app.post('/users', async (req, res) => {
    try {
    let user = req.body;
    const result = await conn.query('INSERT INTO users SET ?', user);
    console.log('result',result)
    res.json({
        message: 'User added successfully',
        data: result[0]
    });

    } catch (error) {
        console.error('Error',error);
        res.status(500).json({
            message: 'Error adding user',
            error: error
        });
    }
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
app.get('/user/:id', async (req, res) => {
    try{
        let id = req.params.id;
        const result = await conn.query('SELECT * FROM users WHERE id = ?', id);
        if (result[0].length == 0) {
            throw new Error('User not found');
        }
        res.json(result[0][0]);
    }
    catch (error) {
        console.error('Error',error);
        let statusCode = error.statusCode || 500;
        res.status(500).json({
            message: 'Error getting user',
            error: error
        });
    }
});