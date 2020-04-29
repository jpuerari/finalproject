const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/final-project', err => {
  if (err) {
    console.log(err)
  }
})

const User = require ("../models/User");

const userdata = [
  {
    name: 'Lili',
    username: 'Liliko@gmail.com',
    password: '12345'
  },
  {
    name: 'Joseph',
    username: 'Puerari@gmail.com',
    password: '12345'
  },
  {
    name: 'Evan',
    username: "evanstein28@gmail.com",
    password: '12345'
  }
];
seedDb();
async function seedDb(){
  try {
    await User.deleteMany({})
    const users = await Promise.all(userdata.map(user => User.create(user)))
    console.log(users)
    mongoose.disconnect()
  } catch (error) {
    console.log(error)
  }
}

