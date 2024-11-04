"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let MaterialService = class MaterialService {
    async create(createMaterialDto) {
        const body = {
            id: createMaterialDto.id,
            name: createMaterialDto.name,
            description: createMaterialDto.description,
            card: createMaterialDto.card,
            content: [],
        };
        const material = await prisma.material.create({
            data: body
        });
        return material;
    }
    async findAll() {
        return prisma.material.findMany();
    }
    async findOne(id) {
        return prisma.material.findUnique({
            where: {
                id: id
            }
        });
    }
    async update(id, updateMaterialDto) {
        const toUpdateMaterial = await this.findOne(id);
        const body = {
            name: updateMaterialDto.name,
            description: updateMaterialDto.description,
        };
        await prisma.material.update({
            where: {
                id: toUpdateMaterial.id
            },
            data: body
        });
        return toUpdateMaterial;
    }
    async remove(id) {
        const toRemove = await this.findOne(id);
        await prisma.material.delete({
            where: {
                id: toRemove.id
            }
        });
    }
};
exports.MaterialService = MaterialService;
exports.MaterialService = MaterialService = __decorate([
    (0, common_1.Injectable)()
], MaterialService);
//# sourceMappingURL=material.service.js.map