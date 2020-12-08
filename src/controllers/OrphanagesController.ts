import { Request, Response } from 'express';

// tudo que vem do banco de dados passa por o nosso getRepository
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

import OrphanageView from '../views/orphanages_view';
import * as Yup from 'yup';


// exportando objeto com 3 métodos
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

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };
        const schema = Yup.object().shape({
            // os campos que tenho na hora de inserir um orfanato
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });
        await schema.validate(data, {
            abortEarly: false
        });
        // deixar os dados pré-criados (só falta adicionar no banco de dados)
        const orphanage = orphanagesRepository.create(data);
    
        // salvar no banco de dados
        await orphanagesRepository.save(orphanage);
        return response.status(201).json(orphanage);
    }
};