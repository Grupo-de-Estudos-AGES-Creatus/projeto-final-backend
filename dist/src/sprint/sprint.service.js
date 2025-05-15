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
        return await prisma.sprint.findUnique({
            where: { id },
        });
    }
    async update(id, updateUserDto) {
        return await prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }
    async remove(id) {
        return await prisma.user.delete({
            where: { id },
        });
    }
};
exports.SprintService = SprintService;
exports.SprintService = SprintService = __decorate([
    (0, common_1.Injectable)()
], SprintService);
//# sourceMappingURL=sprint.service.js.map