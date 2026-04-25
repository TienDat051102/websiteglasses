import Api from "./axios";

class MenuCategories {
  static async getMenuCategoriesCustomer() {
    try {
      const URL = "/menucategories/getMenuCategoriesCustomer";
      const { data } = await Api.get(URL);
      return data.data;
    } catch (e) {
      console.error("Lỗi khi lấy danh sách:", e);
      throw e;
    }
  }
}

export default MenuCategories;
