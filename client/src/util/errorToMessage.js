export const loginErrorToMessage = (error) => {
  if (error.status === 401) {
    return 'Wrong login or password. Please, try again!';
  }

  return error.message;
};

export const registerErrorToMessage = (error) => {
  if (error.xhr.response && error.xhr.response.error) {
    return error.xhr.response.error;
  }

  if (error.status === 403) {
    return 'Oops, something went wrong. Please, try again!';
  }

  return error.message;
};
