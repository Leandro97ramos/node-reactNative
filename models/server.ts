
import express, {Application} from 'express'
import userRouter from '../routes/usuarios';
import cors from 'cors'
import db from '../db/connection';
class Server {

    private app:    Application;
    private port: string ;
    private apiPaths = {
        usuarios: '/api/usuarios' 
    }

    
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        this.routes()

    }
    async dbConnection(){
        try{
                await db.authenticate();
                console.log('Database online');
                
        }catch(error:any){
            throw new Error(error);
            
        }
    }
    middlewares(){

     //CORS
        this.app.use( cors() );
     //LECTURA BODY
        this.app.use( express.json() ); 
     //Carpeta publica
        this.app.use( express.static('public'));
    }
    // Conectar DB
    

    routes(){
        this.app.use( this.apiPaths.usuarios, userRouter)
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto '+ this.port);
            
        })
    }
}

export default Server;