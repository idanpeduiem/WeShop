import { useQuery } from "@tanstack/react-query";
import { ApproveRequests } from "./requests";

const approveRequests = new ApproveRequests();

class ApproveService {
  getExample = () => useQuery(["example"], () => approveRequests.getExample());
}

export const approveService = new ApproveService();
