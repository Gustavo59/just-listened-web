import { createServer } from "miragejs";

import { SEARCH_RESPONSE } from "@/__tests__/data/requests/search";
import { GET_USER_TOKEN_RESPONSE } from "@/__tests__/data/requests/user";

export const startMirage = () => {
    createServer({
        routes() {
            this.post("/auth", () => GET_USER_TOKEN_RESPONSE);

            this.get("/search", () => SEARCH_RESPONSE);

            this.passthrough();
        },
    });
};
