import axios from "axios";
import jwt_decode from "jwt-decode";

// axios.defaults.baseURL = import.meta.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = "http://localhost:8080"

/** Make API Requests */

/** To get email from Token */
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find Token");
  let decode = jwt_decode(token);
  return decode;
}

/** authenticate function */
export async function authenticate(email) {
  try {
    return await axios.post("/users/authenticate", { email });
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
}

/** get User details */
export async function getUser({ email }) {
  try {
    const { data } = await axios.get(`/users/user/${email}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
}

/** register user function */
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/users/register`, credentials);

    let { email } = credentials;

    /** send email */
    // if (status === 201) {
    //   await axios.post("/users/registerMail", { userEmail: email, text: msg });
    // }

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** login function */
export async function verifyPassword({ email, password }) {
  try {
    if (email) {
      const { data } = await axios.post("/users/login", { email, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}

/** update user profile function */
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/users/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}

/** generate OTP */
export async function generateOTP(msisdn) {
  try {
    const {
      data: { code },
      status,
    } = await axios.post("/users/generateOTP", { msisdn });

    // send mail with the OTP
    if (status === 201) {
      let {
        data: { msisdn },
      } = await getUser({ msisdn });
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post("/auth/registerMail", {
        userEmail: msisdn,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject(`Bug: ${error}`);
  }
}

/** verify OTP */
export async function verifyOTP({ msisdn, code }) {
  try {
    const { data, status } = await axios.get("/users/verifyOTP", {
      params: { msisdn, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

/** reset password */
export async function resetPassword({ email, password }) {
  try {
    const { data, status } = await axios.put("/users/resetPassword", {
      email,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}

/**Send Message */
export async function sendMail({ to, from, name, email_body }) {
  try {
    const token = await localStorage.getItem("token");
    const res = await axios.post(`/user/send-mail/`, {
      to,
      from,
      name,
      email_body,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    return { error: "message not sent" };
  }
}

/** register user function */
export async function getGames(data) {
  try {
    const res = await axios.get(`/games`);
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject({ error });
  }
}
