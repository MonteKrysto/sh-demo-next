import axios from "axios";

class Specialty {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000", // json-server endpoint
    });
  }

  async list() {
    const res = await this.api.get("/specialties");
    return res.data;
  }

  async find(id) {
    const res = await this.api.get(`/specialties/${id}`);
    return res.data;
  }
}

export default new Specialty();
