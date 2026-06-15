const isProduction = process.env.NODE_ENV === 'production';
export const api = isProduction ? 'https://error404cm.onrender.com' : 'http://localhost:9000';