import * as React from "react";
import { useState } from "react";
import create from "zustand";
import { IStock } from "./api";
import { IItemProva, IItemResponse } from "./interfaces/i-items";

interface State {
  items: IItemResponse;
  setItems: (item: IItemResponse) => void;
  totalItems: number;
  setTotalItems: (value: number) => void;
  selectedIsin: number | undefined;
  setSelectedIsin: (id: number) => void;
  takeId: number;
  setTakeId: (id: number) => void;
  date: string;
  dataProvider: IStock[];
  setDataProvider: (stock: IStock[]) => void;
  stockList: IStock[];
  isOpen: boolean;
  setIsOpen: (visible: boolean) => void;
  setStockList: (stock: IStock[]) => void;
}

const useStore = create<State>((set) => ({
  items: {
    data: [
      {
        attributes: {
          isin: "",
          price: 0,
          quantity: 0,
        },
        id: -1,
      },
    ],
    meta: {},
  },
  setItems: (items) => set({ items }),
  selectedIsin: 0,
  setSelectedIsin: (selectedIsin) => set({ selectedIsin }),
  dataProvider: [],
  setDataProvider: (dataProvider) => set({ dataProvider }),
  totalItems: 0,
  setTotalItems: (totalItems) => set({ totalItems }),
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  stockList: [],
  setStockList: (stockList) => set({ stockList }),
  takeId: -1,
  setTakeId: (takeId) => set({ takeId }),
  date: "",
}));

export const useProjectStore = useStore;
