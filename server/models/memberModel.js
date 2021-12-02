import axios from "axios";

class Member {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000", // json-server endpoint
    });
  }

  async list(page, limit) {
    const res = await this.api.get(`/members?_page=${page}&_limit=${limit}`);

    return res.data;
  }

  async find(id) {
    const res = await this.api.get(`/members/${id}`);

    return res.data;
  }
}

export default new Member();
