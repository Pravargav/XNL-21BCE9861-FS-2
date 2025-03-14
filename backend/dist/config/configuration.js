"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT || '3002', 10),
    database: {
        uri: process.env.MONGODB_URI || 'mongodb+srv://sambav21bce9861:QeneNvYfgFO2CI3d@cluster0.fajje.mongodb.net/health-fitness',
    },
    gemini: {
        apiKey: process.env.GEMINI_API_KEY,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: '7d',
    },
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    },
    defaultAdmin: {
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
    },
});
//# sourceMappingURL=configuration.js.map