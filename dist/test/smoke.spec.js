"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serializers_1 = require("../src/common/serializers");
describe('Wildfire serializers', () => { it('serializes public profile data', () => { const user = { id: 'u1', createdAt: new Date('2026-01-01T00:00:00Z'), profile: { username: 'alice', displayName: 'Alice', bio: null, avatarUrl: null } }; expect((0, serializers_1.publicProfile)(user, 2)).toEqual(expect.objectContaining({ username: 'alice', publicPostCount: 2 })); }); });
//# sourceMappingURL=smoke.spec.js.map