import { useDisclosure } from "@chakra-ui/react";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
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
  /* selectedIsinData: IITem | undefined; */
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
  /* selectedIsinData: undefined, */
};
const ItemContext = createContext<IItemContext>(initialContext);

const ItemProvider: FC<IItemprovider> = (props) => {
  const [selectedIsin, setSelectedIsin] = useState<number | undefined>();
  const initialItemState = localStorage?.getItem("items");
  const parsedItems: IITem[] = initialItemState
    ? JSON.parse(initialItemState)
    : [
        {
          id: 0,
          name: "item1",
          description: "",
          url: "",
          price: 0,
          quantity: 0,
          isin: "",
          position: 0,
        },
        {
          id: 1,
          name: "item2",
          description: "",
          url: "",
          price: 0,
          quantity: 0,
          isin: "",
          position: 20,
        },
        {
          id: 2,
          name: "item3",
          description: "",
          url: "",
          price: 0,
          quantity: 0,
          isin: "",
          position: 40,
        },
        {
          id: 3,
          name: "item4",
          description: "",
          url: "",
          price: 0,
          quantity: 0,
          isin: "",
          position: 60,
        },
        {
          id: 4,
          name: "item5",
          description: "",
          url: "",
          price: 0,
          quantity: 0,
          isin: "",
          position: 80,
        },
        {
          id: 5,
          name: "item6",
          description: "",
          url: "",
          price: 0,
          quantity: 0,
          isin: "",
          position: 100,
        },
      ];
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
  const [selectedStock, setSelectedStock] = useState<number | undefined>(
    undefined
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  let selectedStockData: IItemProva | undefined;
  if (selectedStock !== undefined) {
    selectedStockData = items.data[selectedStock].attributes;
  }

  console.log(selectedStockData);
  console.log(selectedStock);

  const editStock = (id: number) => {
    setSelectedStock(id);
  };

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
    /* selectedIsinData, */
  };

  return (
    <ItemContext.Provider value={ItemData}>
      {props?.children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
export const useItem = () => useContext(ItemContext);
