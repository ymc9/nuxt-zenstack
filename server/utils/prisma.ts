import { PrismaClient } from "@prisma/client";
import { withPresets } from "@zenstackhq/runtime";
import { type H3Event } from "h3";

export const prisma = new PrismaClient();

export function getExtendedPrisma(event: H3Event) {
  // TODO: Get authentication state from event
  return withPresets(prisma, { user: undefined });
}
