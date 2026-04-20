import Api from "./Axios";

class MenuItems {
  static async getmenuitemsfeatured() {
    try {
      const URL = "/menuitem/menuitemsfeatured";
      const { data } = await Api.get(URL);
      return data.data;
    } catch (error) {
      console.error("Lỗi lấy danh sách sản phẩm", error);
      throw error;
    }
  }
  static async getALlMenuItems(payload) {
    try {
      console.log("Payload:", payload);

      const URL = "/menuitem/getmenuitemspagehome";
      const { data } = await Api.get(URL, payload);

      return data;
    } catch (error) {
      console.error("Lỗi lấy sản phẩm", error);
      throw error;
    }
  }
}
export default MenuItems;
