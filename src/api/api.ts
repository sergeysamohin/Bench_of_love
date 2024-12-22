interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  email: string;
  password: string;
  name: string;
}

export class API {
  static #baseApiUrl = "http://localhost:8000/api/";

  static getUsers = async () => {
    return await this.#fetch(`${this.#baseApiUrl}users/`, {
      method: "GET",
      credentials: "include",
    });
  };

  static getUser = async (id: string) => {
    return await this.#fetch(`${this.#baseApiUrl}users/${id}`, {
      method: "GET",
      credentials: "include",
    });
  };

  static patchStory = async (text: string, id: string) => {
    return await this.#fetch(`${this.#baseApiUrl}users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        story: {
          text,
        },
      }),
      credentials: "include",
    });
  };

  static like = async (id: string, currentLikes: number) => {
    return await this.#fetch(`${this.#baseApiUrl}users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        story: {
          likes: currentLikes + 1
        },
      }),
      credentials: "include",
    });
  }

  static unlike = async (id: string, currentLikes: number) => {
    return await this.#fetch(`${this.#baseApiUrl}users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        story: {
          likes: currentLikes - 1
        },
      }),
      credentials: "include",
    });
  }

  static login = async (body: LoginForm) => {
    return await this.#fetch(`${this.#baseApiUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
  };

  static register = async (body: RegisterForm) => {
    return await this.#fetch(`${this.#baseApiUrl}auth/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        story: {
          title: ``,
          text: ``,
        },
      }),
      credentials: "include",
    });
  };

  static checkAuth = async () => {
    return await this.#fetch(`${this.#baseApiUrl}auth/check-token`, {
      method: "GET",
      credentials: "include",
    });
  };

  static logout = async () => {
    return await this.#fetch(`${this.#baseApiUrl}auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  };

  static #fetch = async (path: string, options?: RequestInit) => {
    const response = await fetch(path, options);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response.json();
  };
}