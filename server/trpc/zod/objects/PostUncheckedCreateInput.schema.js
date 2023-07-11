"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostUncheckedCreateInputObjectSchema = void 0;
/* eslint-disable */
const zod_1 = require("zod");
exports.PostUncheckedCreateInputObjectSchema = zod_1.z.object({
    id: zod_1.z.string().optional(), createdAt: zod_1.z.union([zod_1.z.date().optional(), zod_1.z.string().datetime().optional()]), updatedAt: zod_1.z.union([zod_1.z.date().optional(), zod_1.z.string().datetime().optional()]), title: zod_1.z.string(), content: zod_1.z.string(), published: zod_1.z.boolean().optional(), authorId: zod_1.z.string().optional().nullable()
}).strict();
