import axios from 'axios';

const API_URL = "http://localhost:8081/homepage";

class HomePageService {
  async getHomePage() {
    return await axios.get(API_URL);
  }

}

export default new HomePageService;