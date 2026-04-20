import Api from './Axios';

class Information {
  static async getinformation() {
    try {
      const URL = '/information';
      const { data } = await Api.get(URL);
      return data.data;
    } catch (e) {
      console.error('Lỗi khi lấy thông tin:', e);
      throw e;
    }
  }
}

export default Information;