import {Inject, Injectable} from '@nestjs/common';
import {CreateMaterialDto} from './dto/create-material.dto';
import {UpdateMaterialDto} from './dto/update-material.dto';
import {Material} from "./entities/material.entity";

@Injectable()
export class MaterialService {
    constructor(
        @Inject(Material)
        private materials: Material[] = []
    ){}

    create(createMaterialDto: CreateMaterialDto) {
        const {card, name, description} = createMaterialDto;


        const newMaterial = new Material;
        newMaterial.name = name;
        newMaterial.description = description;
        newMaterial.card = card;
        // newMaterial.card_id = card.id;  -> Card n implementado ainda

        this.materials.push(newMaterial);

        return newMaterial;
    }

    findAll(){
        return this.materials;
    }

    findOne(id: number) {
        return this.materials.find((material) => material.id === id);

    }

    update(id: number, updateMaterialDto: UpdateMaterialDto) {
        const {name, description} = updateMaterialDto;

        const toUpdateMaterial = this.findOne(id);

        toUpdateMaterial.name = name;
        toUpdateMaterial.description = description;

        return toUpdateMaterial;
    }

    remove(id: number) {
        const toRemove = this.findOne(id);
        const indexToRemove = this.materials.indexOf(toRemove);

        if (toRemove !== undefined) {
            this.materials.splice(indexToRemove, 1);
        }
    }
}
