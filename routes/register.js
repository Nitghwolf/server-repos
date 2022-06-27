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

router.post("/login", async (req, res) => {
  try{
    const { git_nick, password } = req.body;
    console.log(req.body)
    const existingUser = await User.findOne({ where: { git_nick: git_nick } });

    if (existingUser && await bcrypt.compare(password, existingUser.password)) {
      req.session.userId = existingUser.id;
      res.send({name: existingUser.name, git_nick:existingUser.git_nick, message: true });
    } else {
      res.send({ message: false });
    }
  }
  catch(error){
    console.log(error);
  }
});

module.exports = router;