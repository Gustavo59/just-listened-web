export const NEXT_AUTH_SESSION_DATA = {
    data: {
        user: {
            name: "John Doe",
            email: "john.doe@example.com",
            image: "https://example.com/",
        },
        accessToken: "",
        expires: new Date().toISOString(),
    },
    status: "authenticated",
};

export const NEXT_AUTH_NOT_SESSION = {
    data: null,
    status: "unauthenticated",
};
