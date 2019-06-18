const mysql = require('mysql');


//para crear la connection 
const connection = mysql.createConnection({
  host: "localhost",
  user: "NodeRESTAPI",
  password: "sandra25*",
  database: "api_mysql"
});

let userModel = {};
userModel.getUsers = (callback) =>{
    if(connection){
        connection.query('select * from users order by id', 
            (err, rows) =>{
                if (err) {
                  throw err;
                } else {

                    callback(null, rows)
                }
            } 
        )
    }
}

userModel.insertUser = (userData, callback) =>{
    if(connection){
        connection.query('insert into users set ?', userData, 
        (err,result) =>{
            if(err){
                callback(err, null)
            }else{
                callback(null, {
                    insertId: result.insertId
                })
            }
        })
    }
} 


userModel.UpdatedUser = (userData, callback) =>{
    if(connection){
        const sql = `
             update users set 
             username = ${connection.escape(userData.username)},
             password = ${connection.escape(userData.password)},
             email = ${connection.escape(userData.email)}
             where id = ${connection.escape(userData.id)}
        `;

        connection.query(sql, (err, result) =>{
            if(err){
                callback(null, err)
            }
            else{
                callback(null, {
                    msg:"success"
                });
            }
        })
    }else{

    }
}

userModel.deleteUser = (id, callback) =>{
    if(connection){
        var sql = `select * from users where id =${connection.escape(id)}`
        connection.query(sql,(err,row) =>{
            if(row.length !== 0){
                console.log(row)
                let sql = `
                    delete from users where id = ${connection.escape(id)}
                `
                connection.query(sql,(err,result)=>{
                    if (err) {
                      throw err;
                    } else {
                      callback(null, { msg: "deleted" });
                    }
                })
                
            }else{
                 callback(null, { msg: "not found" });
            }
        })
    }
}

module.exports = userModel