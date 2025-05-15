"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SprintService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let SprintService = class SprintService {
    async create(createSprintDto) {
        return await prisma.sprint.create({
            data: {
                ...createSprintDto,
                createdAt: new Date(),
            }
        });
    }
    async findAll() {
        return await prisma.sprint.findMany();
    }
    async findOne(id) {
        const sprint = await prisma.sprint.findUnique({
            where: {
                id: id
            },
        });
        if (!sprint) {
            throw new common_1.HttpException("A sprint não existe", common_1.HttpStatus.NOT_FOUND);
        }
        return await prisma.sprint.findUnique({
            where: { id: id },
        });
    }
    async update(id, updateSprintDto) {
        if (!updateSprintDto.descriptionPath && !updateSprintDto.title && !updateSprintDto.isLocked)
            throw new common_1.HttpException("Precisa conter pelo menos uma informação!", common_1.HttpStatus.BAD_REQUEST);
        const sprintIdExist = await prisma.sprint.update({
            where: { id: id },
            data: updateSprintDto,
        });
        if (!sprintIdExist) {
            throw new common_1.HttpException("Naõ existe sala com este Id ", common_1.HttpStatus.BAD_REQUEST);
        }
        if (sprintIdExist) {
            return await prisma.sprint.update({
                where: { id: id },
                data: updateSprintDto,
            });
        }
    }
    async remove(id) {
        const sprint = await prisma.sprint.findUnique({
            where: { id: id },
        });
        if (!sprint) {
            throw new common_1.HttpException("A sprint não existe", common_1.HttpStatus.NOT_FOUND);
        }
        if (sprint) {
            await prisma.sprint.delete({
                where: { id: id },
            });
            throw new common_1.HttpException("Sprint deletada", common_1.HttpStatus.NO_CONTENT);
        }
    }
};
exports.SprintService = SprintService;
exports.SprintService = SprintService = __decorate([
    (0, common_1.Injectable)()
], SprintService);
//# sourceMappingURL=sprint.service.js.map