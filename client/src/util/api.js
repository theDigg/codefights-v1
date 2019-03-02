const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api"
    : `https://${window.location.hostname}/api`;

const methods = {
  get: async function(endpoint, token = null) {
    const options = {
      method: "GET",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      }
    };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) throw Error(json.message);

    return json;
  },

  post: async function(endpoint, body, token = null) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(body)
    };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) {
      if (response.status === 422) {
        json.errors.forEach(error => {
          throw Error(`${error.param} ${error.msg}`);
        });
      }

      throw Error(json.message);
    }

    return json;
  },

  delete: async function(endpoint, token = null) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      }
    };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) {
      if (response.status === 401) throw Error("unauthorized");
      throw Error(json.message);
    }

    return json;
  }
};

export async function login(username, password) {
  const json = await methods.post("login", { username, password });
  return json.token;
}

export async function signup(username, password) {
  const json = await methods.post("register", { username, password });
  return json.token;
}

export async function updateJwt(token) {
  const json = await methods.post("updateJwt", { token });
  return json.token;
}

export async function getLeaderboard() {
  const users = await methods.get("leaderboard");
  return users;
}

export async function submitSolution(code) {
  const results = await methods.post("challenge", code);
  return results;
}

export async function submitDuelSolution(code) {
  const results = await methods.post("challenge", code);
  return results;
}
