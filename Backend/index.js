const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');
const port = 8000


app.use(bodyParser.json());
app.use(cors());

let users = []
let counter = 1;

let conn = null;
const initDBConnection = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8821
    });
}


app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let user = req.body;
        const result = await conn.query('UPDATE users SET ? WHERE id = ?', [user, id]);
        if (result[0].affectedRows == 0) {
            throw {statusCode: 404, message: 'User not found'};
        }
        res.json({
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        console.error('Error',error);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error updating user',
            error: error
        });
    }
}); 



// path = Get / Users สำหรับ get ข้่อมูล user ทั้งหมด
app.get('/users', async (req, res) => {
    const result = await conn.query('SELECT * FROM users');
    res.json(result[0])
});




app.get('/users', (req, res) => {
    res.json(users);
});


app.delete('/users/:id', async (req, res) => {
    try{
        let id = req.params.id;
        let user = req.body;
        const result = await conn.query('DELETE FROM users WHERE id = ?',id);
        if (result[0].length == 0) {
            throw {statusCode: 404,message: 'User not found'}
        }
        res.json({
            message: 'User delete success',
            
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

const validateData = (userData) => {
  let errors = [];
  if (!userData.firstName) {
    errors.push('กรุณากรอกชื่อ');
  }
  if (!userData.lastName) {
    errors.push('กรุณากรอกนามสกุล');
  }
  if (!userData.age) {
    errors.push('กรุณากรอกอายุ');
  }
  if (!userData.gender) {
    errors.push('กรุณาเลือกเพศ');
  }
  if (!userData.interests) {
    errors.push('กรุณาเลือกความสนใจอย่างน้อย 1 อย่าง');
  }
  if (!userData.description) {
    errors.push('กรุณากรอกคำอธิบายเกี่ยวกับตัวเอง');
  }
  return errors;
}

// path = POST /users สำหรับเพิ่ม user ใหม่
app.post('/users', async (req, res) => {
    try {
    let user = req.body;
    const errors = validateData(user);
    if (errors.length > 0) {
        throw {
            message: 'กรอกข้อมูลไม่ครบถ้วน',
            errors: errors
        }
    }
    const result = await conn.query('INSERT INTO users SET ?', user);
    console.log('result',result)
    res.json({
        message: 'User added successfully',
        data: result[0]
    });

    } catch (error) {
        const errorMessage = error.message || 'Error creating user';
        const errors = errors.errors || [];
        console.error('Error creating user',error.message);
        res.status(500).json({
            message: errorMessage,
            errors: errors
        });
    }
})


app.get('/users/:id', async (req, res) => {
    try{
        let userid = req.params.id;
        const result = await conn.query('SELECT * FROM users WHERE id = ?', userid);
        if (result[0].length == 0) {
            throw {statusCode: 404, message: 'User not found'};
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



// path = POST /user
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter
    counter += 1
    users.push(user);
    res.json({
        message: 'User added successfully',
        user: user
    });
});

// path = PUT /user/:id
app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;

    //หา uesr จาก id 
    let selectedIndex = users.findIndex(user => user.id == id);


    // update ข้อมูล user
    // users[selectedIndex] = updateUser 
    if (updateUser.email) {
        users[selectedIndex].email = updateUser.email;
    }
    if (updateUser.name) {
        users[selectedIndex].name = updateUser.name;
    }

    // เอาข้อมูลที่ update ส่ง response กลับไป 
    // res.send(selectedIndex + '')
    res.json({
        message: 'User updated successfully',
        data: {
            user: updateUser,
            indexUpdated: selectedIndex
        }
    });
});

// user จาก id ที่ส่งมา
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;

    // หา index ของ user ที่ต้องการลบจาก id ที่ส่งมา
    let selectedIndex = users.findIndex(user => user.id == id);
    //ลบ user จาก array โดยใช้ delete
    // delete users[selectedIndex];
    users.splice(selectedIndex, 1);
    res.json({
        message: 'User deleted successfully',
        indexDeleted: selectedIndex

    });
});


app.listen(port, async () => {
    await initDBConnection();
    console.log(`Server is running on port ${port}`)
});