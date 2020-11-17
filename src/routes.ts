import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

// routes: Router
const routes = Router();
routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);

// passando congigurações do modo como vão ser guardadas as imagens para upload
const upload = multer(uploadConfig);
routes.post("/orphanages", upload.array('images'), OrphanagesController.create);

export default routes;