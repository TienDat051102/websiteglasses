import Api from "./axios";
class Order {
  static async createOrder(data) {
    const URL = "/me/orders";
    const token = localStorage.getItem("customer_token");
    const response = await Api.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  static async getMyOrders() {
    const URL = "/me/orders";
    const token = localStorage.getItem("customer_token");

    const response = await Api.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}

export default Order;
