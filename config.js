/* eslint-disable no-process-env */
export const PORT = process.env.PORT || '3000';

export const NODE_ENV = process.env.NODE_ENV || 'production';

export const MONGO_URL = process.env.MONGO_URL || 'localhost:27017';
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'myPerfectApp';
export const MONGO_USER = process.env.MONGO_USER || '';
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';

export const ELASTIC_INDEX = process.env.ELASTIC_INDEX || '';
export const ELASTIC_URL = process.env.ELASTIC_URL || '';

export const JSON_LINES_FILE_NAME = process.env.JSON_LINES_FILE_NAME || '';
