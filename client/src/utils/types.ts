export type Department = {
    _id: string,
    description:string
  }
  
export type ItemCategory = {
    _id: string,
    description:string
  }

export  type Size = {
    _id: string,
    description:string
  }
  
  
export type ItemDetails = {
    _id: string,
    description: string,
    price: number,
    image: string,
    department: Department,
    category: ItemCategory,
    stock: Size[],
  }