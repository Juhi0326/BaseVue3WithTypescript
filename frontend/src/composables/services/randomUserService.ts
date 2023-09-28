import axios from 'axios';

const API_URL = 'https://randomuser.me/api/';

class RandomUserService {
  async getRandomUser() {
    return await axios.get(API_URL);
  }
  async getProducts() {
    return await axios.get("http://localhost:8081/products2");
  }
}

export default new RandomUserService;