import 'dotenv/config';
const isProduction = process.env.NODE_ENV === 'production';
const sessionSecret = process.env.SESSION_SECRET;
if (isProduction && (!sessionSecret || sessionSecret.length < 32)) throw new Error('SESSION_SECRET must be at least 32 characters in production.');
export const config = { port: Number(process.env.PORT || 4000), clientUrl: process.env.CLIENT_URL || 'http://localhost:5173', nodeEnv: process.env.NODE_ENV || 'development', sessionSecret: sessionSecret || 'development-only-change-me-please-32-chars', isProduction };
