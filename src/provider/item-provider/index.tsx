import { useDisclosure } from "@chakra-ui/react";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { IStock } from "../../api";
import { IITem, IItemProva, IItemResponse } from "../../interfaces/i-items";

interface IItemprovider {}
export interface IItemContext {
  items: IItemResponse;
  setItems: (item: IItemResponse) => void;
  totalItems: number;
  setTotalItems: (value: number) => void;
  selectedIsin: number | undefined;
  setSelectedIsin: (id: number) => void;
  takeId: number;
  setTakeId: (id: number) => void;
  editStock: (id: number) => void;
  selectedStockData: IItemProva | undefined;
  date: string;
  dataProvider: IStock[];
  setDataProvider: (stock: IStock[]) => void;
  stockList: IStock[];
  setStockList: (stockList: IStock[]) => void;
  isOpen: boolean;
  setIsOpen: (visible: boolean) => void;
}

const initialContext: IItemContext = {
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
  setTakeId: () => {},
  takeId: -1,
  setItems: () => {},
  totalItems: 0,
  setTotalItems: () => {},
  selectedIsin: -1,
  setSelectedIsin: () => {},
  editStock: () => {},
  selectedStockData: undefined,
  date: "",
  dataProvider: [],
  setDataProvider: () => {},
  setStockList: () => {},
  stockList: [],
  isOpen: false,
  setIsOpen: () => {},
};
const ItemContext = createContext<IItemContext>(initialContext);

const ItemProvider: FC<IItemprovider> = (props) => {
  const [selectedIsin, setSelectedIsin] = useState<number | undefined>();
  const [items, setItems] = useState<IItemResponse>({
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
  });
  const [totalItems, setTotalItems] = useState<number>(0);
  const [takeId, setTakeId] = useState<number>(-1);
  const [dataProvider, setDataProvider] = useState<IStock[]>([]);
  const [selectedStock, setSelectedStock] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [stockList, setStockList] = useState<IStock[]>([]);

  let selectedStockData: IItemProva | undefined;
  if (selectedStock !== 0) {
    let selectItem = items.data.filter((item) => {
      const { attributes, id } = item;
      if (item.id === selectedStock) {
        return true;
      }
    });

    selectedStockData = selectItem[0].attributes;
  }

  /* console.log(selectedStockData); */

  const editStock = (id: number) => {
    setSelectedStock(id);
    setIsOpen(true);
  };

  /* console.log(selectedStock); */

  let current: Date = new Date();
  let date: string = `${current.getFullYear()}-03-18`;

  /*   let totalPortfolio = items.map((item) => {
    return item.price * item.quantity;
  });

  let sum = totalPortfolio.reduce((partialSum, a) => partialSum + a, 0);

  let selectedIsinData: IITem | undefined;
  if (selectedIsin !== undefined) {
    selectedIsinData = items[selectedIsin];
  } */

  const ItemData: IItemContext = {
    items,
    setItems,
    setTakeId,
    takeId,
    setTotalItems,
    totalItems,
    selectedIsin,
    setSelectedIsin,
    editStock,
    selectedStockData,
    date,
    dataProvider,
    setDataProvider,
    setStockList,
    stockList,
    isOpen,
    setIsOpen,
  };

  return (
    <ItemContext.Provider value={ItemData}>
      {props?.children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
export const useItem = () => useContext(ItemContext);
