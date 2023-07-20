const{Router} = require('express');
const router=Router();
const user=require('../controllers/users.controller');
const dato=require('../controllers/datos.controller');
//usuarios
router.get('/',user.getUsers);
router.post('/registro', user.addUser);
router.post('/ingreso',user.loginUser);
router.get('/tareas',user.getTasks);
//datos
router.get('/imp',dato.getDatos);
router.post('/quemado', dato.addDatos);    
module.exports=router;
