const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
console.log("API_URL:", BASE_URL);
console.log("API_KEY:", API_KEY);
export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API request failed");
  }

  /*If-satsen behövdes för att inte felkod skulle komma upp i konsolfönstret, denna är endast för delete delen.*/
  if (res.status === 204 || res.headers.get("Content-Length") === "0") {
    return null; // No content
  }

  return res.json();
};

/*I denna fil samt i .env ligger uppsäkringen med den krypterade nyckeln ifrån backenddelen, tog ett id från guid och encodade det med base 64*/