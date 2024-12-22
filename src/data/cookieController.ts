export class CookieController {
  static getToken = () => {
    const token = this.getCookie("token");
    return token;
  };

  static setToken = (token: string | null) => {
    this.setCookie("token", token ? token : "");
  };

  static getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return parts.pop()!.split(";").shift();
    }

    return null;
  };

  static setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value || ""}; path=/;`;
  };
}
