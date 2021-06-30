import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class AuthService {
  async login(user) {
    const response = await axios.post(API_URL + "login", {
      mail: user.mail,
      password: user.password
    });
    console.log(response.data);
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "signup", {
      lastname: user.lastname,
      firstname: user.firstname,
      mail: user.mail,
      password: user.password
    });
  }
}

export default new AuthService();
