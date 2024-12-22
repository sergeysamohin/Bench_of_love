import { User } from "../types";

export class StorageController {
  static getUser = () => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  };

  static setUser = (user: User | null) => {
    const userString = JSON.stringify(user);
    localStorage.setItem("user", userString !== "null" ? userString : "");
  };
}
