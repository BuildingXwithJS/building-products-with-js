export const signRequest = req => ({
  ...req,
  headers: {
    'x-access-token': localStorage.getItem('user.token'),
  },
});
