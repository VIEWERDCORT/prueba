import { model } from "mongoose";
import models from "../models";

export default {
  addLibro: async (req, res, next) => {
    try {
      const { libro, sinopsis } = req.body;

      const libros = new models.Ubicacion({
        libro,
        sinopsis,
      });

      const guardar = await libros.save();
      res.status(200).json(guardar);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error al guardar en el server de BD",
      });
      next(e);
    }
  },
  //Método para consultar en la coleccion de datos de mongoDB
  listarLibros: async (req, res, next) => {
    try {
      const listar = await models.Ubicacion.find();
      res.json(listar);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error al consultar en la BD",
      });
      next(e);
    }
  },

  eliminarLibro: async (req, res, next) => {
    try {
      const eliminar = await models.Ubicacion.findByIdAndDelete(req.params.id);
      res.status(200).json(eliminar);
    } catch (e) {
      res.status(500).send({
        message: "Los datos no se han eliminado",
      });
      next(e);
    }
  },
  //Método para buscar un registro por el ID de la colección
  listarOneLibro: async (req, res, next) => {
    try {
        const listarOne=await models.Ubicacion.findById(req.params.id);
        if(!listarOne){
            res.status(400).send({
                message: 'El registro no se ha encontrado'
            });
        }else{
            res.status(200).json(listarOne);
        }
    } catch (e) {
        res.status(500).send({
            message:'Hubo un error en la conexion a la BD'
        })
        next(e);        
    }
  },

  updateLibro:async(req,res,next)=>{
    try{
        const {
          libro,
        }=req.body;

        const upLibro={
          libro,
        };

        const update=await models.Ubicacion.findByIdAndUpdate(req.params.id,upLibro);
        res.status(200).json(update);

    }catch(e){
        res.status(500).send({
            message:'Hubo un error al actualizar en la BD'
        })
        next(e);
    }
  }
};
