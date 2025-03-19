export const port = parseInt(process.env.PORT, 10) || 3001;

export const globalPrefix = process.env.GLOBAL_PREFIX || 'api';

export const appName = process.env.APP_NAME || 'app';

export const swaggerPath = process.env.SWAGGER_PATH || 'docs';

export const isDev = process.env.NODE_ENV === 'development';
