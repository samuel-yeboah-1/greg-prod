import { authInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { SigninType, SignupType } from "@/types";

export const signinHandler = async (userCredentials: SigninType) => {
  try {
    const response = await authInstance.post("/api/v1/auth/login", userCredentials);
    if (response.status === 200) {
      localStorage.setItem("access_token", response.data.data.token)
      return {
        success: true,
        message: "Login successful",
        data: response.data,
      };
    }

    return {
      success: false,
      message: "Unexpected response from server",
    };
  } catch (error) {
    const err = error as AxiosError<any>;
    if (err.response) {
      const { status, data } = err.response;

      if (status === 404 && data.message) {
        return {
          success: false,
          message: data.message || "No account found",
        };
      }

      return {
        success: false,
        message: data?.message || "An error occurred during sign in.",
      };
    }

    console.error("Sign-in error:", error);
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};

export const signupHandler = async (userCredentials: SignupType) => {
  try {
    // Use the correct backend route
    const response = await authInstance.post("/api/v1/auth/register", userCredentials);

    if (response.status === 200 || response.status === 201) {
      console.log(response.data)
      return {
        success: true,
        message: response.data?.message || "Signup successful",
        data: response.data,
      };
    }

    return {
      success: false,
      message: "Unexpected server response.",
    };
  } catch (error) {
    const err = error as AxiosError<any>;

    if (err.response) {
      const { data, status } = err.response;

      return {
        success: false,
        message: data?.message || `Signup failed with status ${status}.`,
      };
    }

    console.error("Signup error:", error);
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};

/**
 * @param provider The OAuth provider to use (e.g., 'google')
 */
export const oauthHandler = async (provider: string) => {
  // const loginUrl = `http://localhost:5000/auth/${provider}`;
  try {
    const response = await fetch(`https://gregmvp-backend.onrender.com/api/v1/auth/login/${provider}`);
    const data = await response.json()
    console.log(data)
    window.location.href = data.data.redirect_url
  } catch (error) {
    console.error("error during oauth", error)
  }

};