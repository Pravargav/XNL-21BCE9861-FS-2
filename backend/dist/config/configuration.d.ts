declare const _default: () => {
    port: number;
    database: {
        uri: string;
    };
    gemini: {
        apiKey: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    cors: {
        origin: string;
    };
    defaultAdmin: {
        email: string;
        password: string;
    };
};
export default _default;
