import {Injectable} from '@nestjs/common';
import {CreateMaterialDto} from './dto/create-material.dto';
import {UpdateMaterialDto} from './dto/update-material.dto';
import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient()

@Injectable()
export class MaterialService {
    async create(createMaterialDto: CreateMaterialDto) {

        const body = {
            name: createMaterialDto.name,
            description: createMaterialDto.description,
            card: createMaterialDto.card,
            content: [] as any, // Content não finalizado
        }

        await prisma.material.create({
            data: body
        });


    }

    async findAll() {
        return prisma.material.findMany()
    }

    async findOne(id: number) {
        return prisma.material.findUnique({
            where: {
                id: id
            }
        });

    }

    async update(id: number, updateMaterialDto: UpdateMaterialDto) {
        const toUpdateMaterial = await this.findOne(id);

        const body = {
            name: updateMaterialDto.name,
            description: updateMaterialDto.description,
        }

        await prisma.material.update({
            where: {
                id: toUpdateMaterial.id
            },
            data: body
        })

        return toUpdateMaterial;
    }

    async remove(id: number) {
        const toRemove = await this.findOne(id);

        await prisma.material.delete({
            where: {
                id: toRemove.id
            }
        })
    }
}
