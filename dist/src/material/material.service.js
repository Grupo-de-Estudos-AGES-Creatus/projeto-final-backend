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
let MaterialService = class MaterialService {
    create(createMaterialDto) {
        return 'This action adds a new material';
    }
    findAll() {
        return `This action returns all material`;
    }
    findOne(id) {
        return `This action returns a #${id} material`;
    }
    update(id, updateMaterialDto) {
        return `This action updates a #${id} material`;
    }
    remove(id) {
        return `This action removes a #${id} material`;
    }
};
exports.MaterialService = MaterialService;
exports.MaterialService = MaterialService = __decorate([
    (0, common_1.Injectable)()
], MaterialService);
//# sourceMappingURL=material.service.js.map