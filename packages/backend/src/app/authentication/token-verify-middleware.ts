import { FastifyReply, FastifyRequest } from "fastify";
import { tokenUtils } from "./lib/token-utils";
import { ActivepiecesError, ErrorCode } from "@activepieces/shared";

const ignoredRoutes = new Set([
    // BEGIN EE
    "/v1/connection-keys/app-connections",
    "/v1/firebase/users",
    "/v1/firebase/sign-in",
    // END EE
    "/v1/authentication/sign-in",
    "/v1/authentication/sign-up",
    "/v1/flags",
    "/v1/oauth2/claim",
    "/v1/oauth2/claim-with-cloud",
    "/v1/pieces",
    "/v1/webhooks",
    "/v1/docs",
    "/redirect",
]);

const HEADER_PREFIX = "Bearer ";

export const tokenVerifyMiddleware = async (request: FastifyRequest, _reply: FastifyReply): Promise<void> => {
    if (ignoredRoutes.has(request.routerPath)) {
        return;
    }
    const rawToken = request.headers.authorization;
    if (rawToken === undefined || rawToken === null) {
        throw new ActivepiecesError({ code: ErrorCode.INVALID_BEARER_TOKEN, params: {} });
    }
    else {
        try {
            const token = rawToken.substring(HEADER_PREFIX.length);
            const principal = await tokenUtils.decode(token);
            request.principal = principal;
        }
        catch (e) {
            throw new ActivepiecesError({ code: ErrorCode.INVALID_BEARER_TOKEN, params: {} });
        }
    }
};
