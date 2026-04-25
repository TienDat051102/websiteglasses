import Api from "./axios";

class Customer {
  static async createCustomer(data) {
    const URL = "/customer/create";
    const response = await Api.post(URL, data);
    return response.data;
  }
  static async loginCustomer(data) {
    const URL = "/customer/login";
    const response = await Api.post(URL, data);
    return response.data;
  }
  static async updateCustomer(data) {
    const URL = "/customer/update-profile";
    const token = localStorage.getItem("customer_token");
    console.log("TOKEN:", localStorage.getItem("customer_token"));
    const response = await Api.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  static async getMyEyeExams() {
    const URL = "/me/eye-exams";

    const token = localStorage.getItem("customer_token");

    if (!token) {
      throw new Error("No auth token found");
    }

    const response = await Api.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}
export default Customer;
