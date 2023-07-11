"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateSchema = exports.UserCreateSchema = exports.UserSchema = void 0;
/* eslint-disable */
const zod_1 = require("zod");
const baseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
exports.UserSchema = baseSchema;
exports.UserCreateSchema = baseSchema.partial({
    id: true,
});
exports.UserUpdateSchema = baseSchema.partial();
