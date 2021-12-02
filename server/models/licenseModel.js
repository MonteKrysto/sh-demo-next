import axios from "axios";

class License {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000", // json-server endpoint
    });
  }

  async list() {
    const res = await this.api.get("/licenses");
    return res.data;
  }

  async find(id) {
    const res = await this.api.get(`/licenses/${id}`);
    return res.data;
  }
}

export default new License();
