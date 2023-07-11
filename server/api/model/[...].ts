/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */
import type { DbClientContract } from '@zenstackhq/runtime';
import APIHandler from '@zenstackhq/server/api/rpc';

// @ts-expect-error
const apiHandler = APIHandler.default();

export default defineEventHandler(async (event) => {
    const method = getMethod(event);
    const routerParam = getRouterParams(event);
    const query = await getQuery(event);

    let reqBody: any;
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        reqBody = await readBody(event);
    }

    const { status, body } = await apiHandler({
        prisma: getExtendedPrisma(event) as unknown as DbClientContract,
        method: getMethod(event),
        path: routerParam._,
        query: query as Record<string, string | string[]>,
        requestBody: reqBody,
    });

    setResponseStatus(event, status);
    return body;
});
