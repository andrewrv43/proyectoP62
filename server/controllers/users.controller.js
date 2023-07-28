const User=require('../models/usuarios');
const usersController={};
usersController.getUsers=async(req,res)=>
{
    try {
        const usuarios = await User.find();
        res.send(usuarios);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los usuarios');
      }
}

usersController.addUser=async(req,res)=>{
  try {
    const{username,correo,contraseña,cargo}=req.body;
    const newUser= new User({
    username:username,
    correo:correo,
    contraseña:contraseña,
    cargo:cargo
    });
  await newUser.save();
  
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar el usuario');
  }

}

usersController.getUserByEmailAndPassword = async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
      const user = await User.findOne({ correo, contraseña });
      if (!user) {
          return res.status(404).json({ message: 'Usuario no existe' });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: 'Error' });
  }
}






module.exports=usersController;