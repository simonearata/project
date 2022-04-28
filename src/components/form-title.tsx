import { Box, Button, Input, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
  fetchGetItems,
  IStock,
} from "../api";
import {
  IITem,
  IItemIdAttributes,
  IItemProva,
  IItemResponse,
} from "../interfaces/i-items";
import { IItemContext, useItem } from "../provider/item-provider";
import { useProjectStore } from "../zust";

function FormTitle() {
  const { selectedStockData }: IItemContext = useItem();

  const setItems = useProjectStore((state) => state.setItems);
  const setIsOpen = useProjectStore((state) => state.setIsOpen);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState<boolean>(false);

  const initialState: IItemProva = { isin: "initial", price: 0, quantity: 0 };
  const [formData, setFormData] = useState<IItemProva>(
    selectedStockData ? selectedStockData : initialState
  );

  const onChangeData = (field: string, value: string | number) => {
    const newState = { ...formData, [field]: value };
    setFormData(newState);
  };

  const onSubmit = () => {
    fetchApiPost("stocks", formData).then((data) => {
      fetchApiGet<IItemResponse>("stocks")
        .then((data) => {
          setItems(data);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    });
  };

  /* console.log(formData); */

  const resetFormData = () => {
    setFormData(initialState);
  };

  const onUpdate = (id: number) => {
    fetchApiPut(`stocks/${id}`, formData);
  };

  const buttonClose = () => {
    setIsOpen(false);
    resetFormData();
  };

  /* const getItems = (isin: string) => {
    fetchGetItems<IStock>(`${isin}/range/1/day/${date}/${date}`).then(
      (data) => {
        setDataProvider(data);
      }
    );
  }; */

  /*   const [itemData, setItemData] = useState<IITem>(
    selectedIsinData ? selectedIsinData : initialItemState
  ); */

  /*   const onChangeData = (field: string, value: string | number) => {
    const newState = { ...itemData, [field]: value };
    setItemData(newState);
  }; */

  /*   const onSaveClick = () => {
    if (selectedIsinData === undefined) {
      insertItem(itemData);
    } else {
      updateIsin(itemData);
    }
  }; */

  return (
    <>
      <Button onClick={onOpen}>Inserisci titolo</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Item</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="isin">isin</FormLabel>
              <Input
                id="isin"
                type="text"
                value={formData?.isin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeData("isin", e?.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={"50px"}>
              <FormLabel htmlFor="price">Prezzo d'acquisto</FormLabel>
              <Input
                id="price"
                type="number"
                value={formData?.price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeData("price", e?.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={"50px"}>
              <FormLabel htmlFor="quantity">Quantità</FormLabel>
              <Input
                id="quantity"
                type="number"
                value={formData?.quantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeData("quantity", e?.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                buttonClose();
              }}
            >
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onSubmit();
                /* getItems(formData.isin); */
              }}
            >
              Invia
            </Button>
            <Button variant="ghost" onClick={() => {}}>
              Modifica
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FormTitle;
