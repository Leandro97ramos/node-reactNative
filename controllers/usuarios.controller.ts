import {Request , Response} from 'express'
import User from '../models/usuario';
export const getUsuarios = async (req: Request,res: Response ) => {

const usuarios = await User.findAll();

    res.json({usuarios});

}


export const getUsuario = async(req: Request,res: Response ) => {
    const {id} = req.params;

    const usuario = await User.findByPk(id);
    if ( usuario ) {
        
        res.json({
            usuario
        })
    }else{
        res.status(404).json({
            msg: 'no existe un usuario con ese id'
        })
    }

    
}

export const postUsuarios = async(req: Request,res: Response ) => {
    const {body} = req;

    try {
        const existeEmail = await User.findOne({
            where:{
                email: body.email
            }
        })

        if(existeEmail){
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese mail ' + body.email
            })
        }
        const usuario = await User.create(body);
       // await usuario.save();
        res.json( usuario)
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            msg:' esta roto'
        })
    }

  

}


export const putUsuarios = async(req: Request,res: Response ) => {
    const {id} = req.params;
    const {body} = req;

    try {
        
        const usuario = await User.findByPk(id);
        if ( !usuario) {
            return res.status(404).json({
                msg: ' no existe usuario con id ' +id
            })
        }

        await usuario.update(body);

        res.json(usuario)

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            msg:' esta roto'
        })
    }

}

export const deleteUsuarios = async(req: Request,res: Response ) => {
    const {id} = req.params;

  try {
        const usuario = await User.findByPk(id);
        if ( !usuario) {
            return res.status(404).json({
                msg: ' no se encontro el usuario'
            })

        }

        await usuario.destroy()
        res.json(usuario)
  } catch (error) {
      
  }

}
