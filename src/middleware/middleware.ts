import { MiddlewareHandler } from "hono";
import { auth } from "../lib/auth";

const middleware: MiddlewareHandler = async (c, next) => {

    const session = await auth.api.getSession({
        headers: c.req.raw.headers
    })

    const isAuthenticated = true;
    if (isAuthenticated) {
        await next();
    } else {
        return c.json({ error: "Unauthorized" }, 401);
    }
};

export default middleware