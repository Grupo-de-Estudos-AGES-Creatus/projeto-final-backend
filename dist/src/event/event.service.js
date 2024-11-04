"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let EventService = class EventService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createEventDto) {
        if (createEventDto.end_date < createEventDto.start_date) {
            return "Event end date is smaller than start date";
        }
        return this.prisma.event.create({ data: createEventDto });
    }
    async findAll() {
        return this.prisma.event.findMany({});
    }
    findOne(id) {
        return `This action returns a #${id} event`;
    }
    async findUpcomingEvents(date) {
        const curTime = date ? date : new Date();
        return await this.prisma.event.findMany({ where: { end_date: { gte: curTime.toISOString() } } });
    }
    async update(updateEventDto) {
        const updateData = { ...updateEventDto };
        if (updateEventDto.start_date) {
            updateData.start_date = new Date(updateEventDto.start_date).toISOString();
        }
        if (updateEventDto.end_date) {
            updateData.end_date = new Date(updateEventDto.end_date).toISOString();
        }
        if (updateData.start_date > updateData.end_date) {
            return "start date can't be bigger than end date";
        }
        const upd = await this.prisma.event.update({ data: updateData, where: { id: updateEventDto.id } });
        return upd;
    }
    async remove(id) {
        if (await this.prisma.event.delete({ where: { id: id } }))
            return true;
        else
            return false;
    }
    async removeOld(date) {
        const curTime = date ? date : new Date();
        if (await this.prisma.event.deleteMany({ where: { end_date: { lt: curTime.toISOString() } } })) {
            return true;
        }
        return false;
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventService);
//# sourceMappingURL=event.service.js.map