export const BASE_URL = "http://localhost:3001";

const request = ({ url, method = "POST", data }) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (!res.ok) return Promise.reject(res.status);

    return res.json();
  });
};

export const register = (email, password) => {
  return request({ url: "/signup", data: { email, password } });
};

export const authorize = (email, password) => {
  return request({ url: "/signin", data: { email, password } });
};

export const getContent = () => {
  return request({ url: "/users/me", method: "GET" });
};

export const logOut = () => {
  return request({ url: "/logout", method: "GET" });
};
