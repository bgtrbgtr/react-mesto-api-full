export const BASE_URL = "https://auth.nomoreparties.co";

const request = ({ url, method = "POST", token, data }) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (!res.ok) return Promise.reject(res.status);

    return res.json();
  });
};

export const register = (password, email) => {
  return request({ url: "/signup", data: { password, email } });
};

export const authorize = (password, email) => {
  return request({ url: "/signin", data: { password, email } });
};

export const getContent = (jwt) => {
  return request({ url: "/users/me", method: "GET", token: jwt });
};
