import { ISignUpModel } from "_types/models/users/ISignUpModel";
import axios from "_utils/axios.utils";

class ApiAuth {
  static signUp(data: ISignUpModel) {
    return axios.post("auth/sign-up", data);
  }

  static signIn(data:{email: string, password: string}) {
    return axios.post("auth/sign-in", data);
  }

  static currentUser() {
    return axios.get("auth/current-user");
  }

}

export default ApiAuth;
