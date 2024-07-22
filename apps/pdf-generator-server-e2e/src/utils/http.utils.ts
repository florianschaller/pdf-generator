export const getHeaders = () => {
  const username = 'admin';
  const password = 'changeIt1!';
  return {
    Authorization:
      'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
  };
};
