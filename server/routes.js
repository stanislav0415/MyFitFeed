import { Router } from "express";
import userController from "./controllers/userController.js";
import postController from "./controllers/postController.js";


const routes = Router();

routes.use('/users', userController);
routes.use('/post', postController);
routes.all('*url', (req,res)=> {
    res.status(404).json({message: 'Not Found!'});
})

export default routes; 