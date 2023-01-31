export const PORT = import.meta.env.PORT;
export const ENV = import.meta.env.VITE_NODE_ENV;
export const PRODUCTION = ENV?.toLowerCase()?.startsWith("prod");
export const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;
export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const REGION = "us-east-1";
export const COGNITO_POOL_ID = import.meta.env.VITE_COGNITO_POOL_ID;
export const COGNITO_USER_POOL_NAME = import.meta.env
  .VITE_COGNITO_USER_POOL_NAME;
export const ISSUER = `https://cognito-idp.${REGION}.amazonaws.com/${COGNITO_POOL_ID}`;

// see https://cognito-idp.us-east-1.amazonaws.com/us-east-1_q0JLpYNG0/.well-known/openid-configuration
export const TOKEN_ENDPOINT = `https://${COGNITO_USER_POOL_NAME}.auth.${REGION}.amazoncognito.com/oauth2/token`;

export const CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;
export const SCOPE = "openid profile email offline_access";
