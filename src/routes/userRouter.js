const User = require("../models/user");

module.exports = function (app){
    
    app.get('/users', (req,res) =>{
       User.getUsers((err, data) =>{
           res.json(data)
       })
    })

    app.post('/users', (req, res) =>{
     
        let userData = {
          id: null,
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          created_at: null,
          updated_at:null
        };
     

        User.insertUser(userData, (err, data) =>{
            console.log(data);
            if(data && data.insertId){
                
                res.json({
                    success: true,
                    msq:"usuario insertado",
                    data:data
                })
            }else{
                res.status(500).json({
                    success:false,
                    error:err
                })
            }
        })
    })

    app.put('/users/:id',(req, res) =>{
            
         let userData = {
           id: req.params.id,
           username: req.body.username,
           password: req.body.password,
           email: req.body.email,
           created_at: null,
           updated_at: null
         };

         User.UpdatedUser(userData, (err, data) =>{
             if(data && data.msg){
                 res.json(data)
             }else{
                res.status(400).json({err})
             }
         })
    })
    app.delete('/users/:id',(req,res) =>{
        User.deleteUser(req.params.id,(err,data) =>{
             if(data && data.msg ==='deleted' || data.msg === 'not found'){
                 res.json({
                     success:true,
                     data 
                 })
             }
        })
    })
}