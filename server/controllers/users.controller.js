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
  const token=jwt.sign({_id:
    newUser._id},'secretkey');
    res.status(200).json({token});


  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar el usuario');
  }

}
usersController.loginUser= async(req,res)=>
{
  const{correo,contraseña}=req.body;
  const user=await User.findOne({correo})
  if(!user)return
  res.status(401).send("El correo no existe");
  if(user.contraseña!=contraseña) return
  res.status(401).send("Clave incorrecta");
  const
  token=jwt.sign({_id:user._id},'secretkey');
  return res.status(200).json({token});
}    

usersController.getTasks=async(req,res)=>
{
res.json([
{
_id:1,
name:'Tarea1',
descripcion:'Informacion tarea1'
},
{
_id:2,
name:'Tarea2',
descripcion:'Informacion tarea2'
},
{
_id:3,
name:'Tarea3',
descripcion:'Informacion tarea3'
}
])
}

function verificarToken(req, res, next){
  console.log(req.headers.authorization);
  if(!req.headers.authorization)
  {
  return res.status(401).send("No tiene autorización para continuar");
  }
  const
  token=req.headers.authorization.split('')[1]
  if(token=='null')
  {
  return res.status(401).send("No existe token");
  }
  const
  payload=jwt.verify(token,'secretkey');
  console.log(payload);
  req.userId=payload._id;
  next();
  }


module.exports=usersController;