import { InternalExcept, MissingTokenException } from "@/domain/exceptions";
import { GetUserTokenResponse } from "@/domain/requests/user";
import { api } from "@/external_interfaces/api";

export class UserController {
    public static async auth(googleToken: string) {
        const url = `${process.env.NEXT_PUBLIC_API || ""}/auth`;

        const request = new Request(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_token: googleToken }),
        });

        const response = await api(request);

        if (response.status === 200) {
            const { token } = (await response.json()) as GetUserTokenResponse;
            if (!token) throw new MissingTokenException();
            return token;
        }

        throw new InternalExcept();
    }
}
