const { REACT_APP_INSTANCE_NAME } = process.env;

export const captureError = async (error: unknown | Error, variables?: unknown) => {
  // Can be pushed to e.g. Sentry
  console.error(error, variables, REACT_APP_INSTANCE_NAME);
};
