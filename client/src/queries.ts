import AxiosInstance from "./utils/axiosInstance";


export const getItemQuery = async (id:string) => await AxiosInstance.get(`/items/${id}`)
.then(itemData => itemData.data)
.catch(() =>  new Error('something went wrong')) 