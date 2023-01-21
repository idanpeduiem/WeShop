import { AxiosResponse } from "axios";
import AxiosInstance from "./axiosInstance";
export class ApproveRequests {
  getExample = async () => {
    try {
      const response: AxiosResponse = await AxiosInstance.get(`/`);
      return response.data;
    } catch (error) {
      throw new Error("failed to fetch requests");
    }
  };
}
