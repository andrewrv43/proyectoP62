const datos=require('../models/datos');
const datosController={};
datosController.getDatos=async(req,res)=>
{

        const data = await datos.find();
        res.send(data);

}

datosController.addDatos=async(req,res)=>{

      const{color}=req.body;
    const newDato= new datos({
      color:color
      });
    await newDato.save();
    // const token=jwt.sign({_id:
    //   newDato._id},'secretkey');
    //   res.status(200).json({token});

  
  }

module.exports=datosController;