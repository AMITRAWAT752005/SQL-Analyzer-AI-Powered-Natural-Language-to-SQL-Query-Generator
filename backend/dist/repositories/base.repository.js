"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    client;
    constructor(client) {
        this.client = client;
    }
    async execute(operation) {
        return operation();
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map