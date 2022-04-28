import { apiConfig } from "../config";
import { IItemProva } from "../interfaces/i-items";

export interface IStock {
  status: string;
  from: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  afterHours: number;
  preMarket: number;
}

export interface Result {
  v: number;
  vw: number;
  o: number;
  c: number;
  h: number;
  l: number;
  t: number;
  n: number;
}

export function fetchApiGet<T>(api: string): Promise<T> {
  const { dev, qlt, prod } = apiConfig?.environments;
  const url = `${prod?.apiUrl}${api}`;

  /* return new Promise<T>((resolve, reject) => {}) */

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });

  /*   return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => {
          const result = res.json();
          console.log(result);
          if (res.status === 403) {
            reject(result);
          }

          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    }); */
}

export const fetchApiPost = (api: string, formData: IItemProva) => {
  const { dev, qlt, prod } = apiConfig?.environments;
  const url = `${prod?.apiUrl}${api}`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        isin: formData.isin,
        price: formData.price,
        quantity: formData.quantity,
      },
    }),
  }).then((response) => response.json());
};

export const fetchApiPut = (api: string, formData: IItemProva) => {
  const { dev, qlt, prod } = apiConfig?.environments;
  const url = `${prod?.apiUrl}${api}`;

  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        isin: formData.isin,
        price: formData.price,
        quantity: formData.quantity,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

export const fetchApiDelete = (api: string) => {
  const { dev, qlt, prod } = apiConfig?.environments;
  const url = `${prod?.apiUrl}${api}`;

  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export function fetchGetItems<T>(api: string): Promise<T> {
  const { dev, qlt, prod } = apiConfig?.environmentsPolygons;
  const url = `${prod?.apiUrl}${api}apiKey=${prod?.apiKey}`;

  return fetch(url).then((response) => response.json());
}
