const rawBaseUrl = process.env.REACT_APP_API_URL || "";
export const API_BASE_URL = rawBaseUrl.replace(/\/$/, "");

export const apiUrl = (path) => `${API_BASE_URL}${path}`;

export const getAdminToken = () => sessionStorage.getItem("adminToken") || "";

export const adminFetch = (path, options = {}) => {
  const headers = new Headers(options.headers || {});
  const token = getAdminToken();

  if (token) headers.set("Authorization", `Bearer ${token}`);

  return fetch(apiUrl(path), {
    ...options,
    headers,
  });
};

export const getAssetUrl = (path) => {
  if (!path) return "/images/no-image.png";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return `${API_BASE_URL}${path}`;
  return path;
};
