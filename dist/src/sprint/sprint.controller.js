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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SprintController = void 0;
const common_1 = require("@nestjs/common");
const sprint_service_1 = require("./sprint.service");
const create_sprint_dto_1 = require("./dto/create-sprint.dto");
const update_sprint_dto_1 = require("./dto/update-sprint.dto");
let SprintController = class SprintController {
    constructor(sprintService) {
        this.sprintService = sprintService;
    }
    create(createUserDto) {
        return this.sprintService.create(createUserDto);
    }
    findAll() {
        return this.sprintService.findAll();
    }
    async findOne(id) {
        return await this.sprintService.findOne(id);
    }
    update(id, updateSprintDto) {
        return this.sprintService.update(id, updateSprintDto);
    }
    remove(id) {
        return this.sprintService.remove(id);
    }
};
exports.SprintController = SprintController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sprint_dto_1.CreateSprintDto]),
    __metadata("design:returntype", void 0)
], SprintController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SprintController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SprintController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_sprint_dto_1.UpdateSprintDto]),
    __metadata("design:returntype", void 0)
], SprintController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SprintController.prototype, "remove", null);
exports.SprintController = SprintController = __decorate([
    (0, common_1.Controller)('sprint'),
    __metadata("design:paramtypes", [sprint_service_1.SprintService])
], SprintController);
//# sourceMappingURL=sprint.controller.js.map