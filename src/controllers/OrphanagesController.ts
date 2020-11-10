import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import OrphanageView from '../views/orphanages_view';

export default {
    async show(request: Request, response: Response) {
        const { id } = request.params;
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });
        
        return response.json(OrphanageView.render(orphanage));
    },
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.json(OrphanageView.renderMany(orphanages));
    },
    async create(request: Request, response: Response) {

        console.log(request.files);

        console.log(request.query); 
        // Amostrará todas as querys feitas naquela rota
        console.log(request.params);
        // Amostrará todas as params feitas naquela rota
        console.log(request.body);
        // Amostrará todas as body feitas naquela rota
    
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const orphanagesRepository = getRepository(Orphanage);
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const orphanage = orphanagesRepository.create({
            nome,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        });
    
        // salvar no banco de dados
        await orphanagesRepository.save(orphanage);
        return response.status(201).json(orphanage);
    }
};