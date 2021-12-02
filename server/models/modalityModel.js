import axios from "axios";

class Modality {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000", // json-server endpoint
    });
  }

  async list() {
    const res = await this.api.get("/modalities");
    return res.data;
  }

  async find(id) {
    const res = await this.api.get(`/modalities/${id}`);
    return res.data;
  }
}

export default new Modality();
