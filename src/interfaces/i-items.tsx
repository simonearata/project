export interface IITem {
  id: number;
  name: string;
  description: string;
  isin: string;
  price: number;
  quantity: number;
  position: number;
  url: string;
}

export interface IItemProva {
  isin: string;
  price: number;
  quantity: number;
}

export interface IItemIdAttributes {
  id: number;
  attributes: IItemProva;
}

export interface IItemResponse {
  //data: IItemProva[];
  /* data: { id: number; attributes: IItemProva }[]; */
  data: IItemIdAttributes[];
  meta: any;
}
