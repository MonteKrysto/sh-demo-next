import axios from "axios";

class Condition {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000", // json-server endpoint
    });
  }

  async list() {
    const res = await this.api.get("/conditions");
    return res.data;
  }

  async find(id) {
    const res = await this.api.get(`/conditions/${id}`);
    return res.data;
  }
}

export default new Condition();
