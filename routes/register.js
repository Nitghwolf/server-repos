const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../db/models');

router.post("/", async (req, res) => {
    try{
        const { name, password, git_nick} = req.body;
  
        const existingUser = await User.findOne({ where: { git_nick: git_nick } });
        if (existingUser) {
          res.send({ message: 'Такой пользователь уже существует' });
          return;
        }
    
        const user = await User.create({
          name: name,
          password: await bcrypt.hash(password, 10),
          git_nick: git_nick
        });
        req.session.userId = user.id;
        res.send('ok');
    }
    catch(error){
        console.log(error);
    }
});

router.get("/", async (req, res) => {
  try{

  }
  catch(error){
    console.log(error);
  }
});

module.exports = router;