export interface Data {
  id: number
  name: string
  oldPrice: string
  newPrice: string
  desc: string
  status: number
  imgUrl: string
  inventoryCount: number
  saleCount: number
  favorCount: number
  address: string
  categoryId: number
  carId?: any
  createAt: string
  updateAt: string
}

export interface productType {
  code: number
  msg: string
  data: Data
}
