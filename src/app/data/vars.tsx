const variables = {
  port: import.meta.env.PORT,
  env: import.meta.env.VITE_PUBLIC_NODE_ENV,
  domain_name: import.meta.env.VITE_PUBLIC_DOMAIN_NAME,
  api_endpoint:
    import.meta.env.VITE_PUBLIC_NODE_ENV !== "production"
      ? import.meta.env.VITE_PUBLIC_API_ENDPOINT_DEV
      : import.meta.env.VITE_PUBLIC_API_ENDPOINT_PROD,
};

export default variables;
