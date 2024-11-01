"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
let EventService = class EventService {
    create(createEventDto) {
        return 'This action adds a new event';
    }
    findAll() {
        return `This action returns all event`;
    }
    findOne(id) {
        return `This action returns a #${id} event`;
    }
<<<<<<< HEAD
    update(id, updateEventDto) {
        return `This action updates a #${id} event`;
    }
    remove(id) {
        return `This action removes a #${id} event`;
=======
    async findUpcomingEvents(date) {
        const curTime = date ? date : new Date();
        return await this.prisma.event.findMany({ where: { end_date: { gte: curTime.toISOString() } } });
    }
    async update(id, updateEventDto) {
        const upd = await this.prisma.event.update({ data: updateEventDto, where: { id: id } });
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
>>>>>>> 0e418e1b (update ta zoado mas o resto ta certo)
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
<<<<<<< HEAD
    (0, common_1.Injectable)()
=======
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
>>>>>>> 0e418e1b (update ta zoado mas o resto ta certo)
], EventService);
//# sourceMappingURL=event.service.js.map