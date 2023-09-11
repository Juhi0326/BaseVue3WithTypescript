import axios from 'axios';

const API_URL = 'https://randomuser.me/api/';

class RandomUserService {
  async getRandomUser() {
    return await axios.get(API_URL);
  }

}

export default new RandomUserService;