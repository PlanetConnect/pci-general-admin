const variables = {
  port: process.env.PORT,
  env: process.env.REACT_APP_NODE_ENV,
  domain_name: process.env.REACT_APP_DOMAIN_NAME,
  api_endpoint:
    process.env.REACT_APP_NODE_ENV !== "production"
      ? process.env.REACT_APP_API_ENDPOINT_DEV
      : process.env.REACT_APP_API_ENDPOINT_PROD,
};

export default variables;
