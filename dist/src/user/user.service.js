"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
let UserService = class UserService {
    async create(createUserDto) {
        const password = createUserDto.password;
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        createUserDto.password = hash;
        return await prisma.user.create({
            data: {
                ...createUserDto,
                created_at: new Date(),
            },
        });
    }
    async findAll() {
        return await prisma.user.findMany();
    }
    async findOne(id) {
        return await prisma.user.findUnique({
            where: { id },
        });
    }
    async findAndVerify(email, password) {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    }
    async update(id, updateUserDto) {
        const password = updateUserDto.password;
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        updateUserDto.password = hash;
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
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map