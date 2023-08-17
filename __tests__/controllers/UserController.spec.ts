import { UserController } from "@/controllers/UserController";
import { api } from "@/external_interfaces/api";
import { GET_USER_TOKEN_RESPONSE } from "../data/requests/user";

jest.mock("../../src/external_interfaces/api");
global.Request = jest.fn().mockImplementation(() => ({}));

describe("user controller tests", () => {
    test("try auth user", async () => {
        (api as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve(GET_USER_TOKEN_RESPONSE),
            status: 200,
        });

        const expected = "TOKEN";

        await expect(UserController.auth("token")).resolves.toStrictEqual(
            expected,
        );
    });
});
