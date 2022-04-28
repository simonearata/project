import {
  Box,
  Button,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IItemContext, useItem } from "../../../provider/item-provider";
import { PieChart, Pie } from "recharts";
import FormTitle from "../../form-title";
import {
  fetchApiDelete,
  fetchApiGet,
  fetchGetItems,
  IStock,
} from "../../../api";
import { IItemResponse } from "../../../interfaces/i-items";
import { useProjectStore } from "../../../zust";

function Wallet() {
  const { editStock }: IItemContext = useItem();

  const { items, dataProvider, setItems, setDataProvider, setTakeId, date } =
    useProjectStore((state) => ({
      items: state.items,
      dataProvider: state.dataProvider,
      setItems: state.setItems,
      setDataProvider: state.setDataProvider,
      setTakeId: state.setTakeId,
      date: state.date,
    }));

  const [error, setError] = useState<boolean>(false);
  let yourDate = new Date();
  let todayPrice = `${yourDate.getFullYear()}-0${yourDate.getMonth() + 1}-${
    yourDate.getDate() - 1
  }`;

  useEffect(() => {
    const f = fetchApiGet<IItemResponse>("stocks")
      .then((stockResult) => {
        console.log(stockResult);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });

    const g = items?.data?.forEach((item, index) => {
      const { attributes, id } = item;
      console.log(dataProvider);

      fetchGetItems<IStock>(
        `${attributes?.isin}/${todayPrice}?adjusted=true&`
      ).then((data) => {
        return setDataProvider([...dataProvider, data]);
      });
    });

    Promise.all([f, g]).then((value) => {
      console.log(value);
    });
  }, []);

  const getId = (id: number) => {
    setTakeId(id);
  };

  let data = items?.data?.map((item) => {
    return {
      name: item?.attributes?.isin,
      value: Number(item?.attributes?.price * item?.attributes?.quantity),
    };
  });

  const deleteStock = (id: number) => {
    fetchApiDelete(`stocks/${id}`).then((data) => {
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

  /* const ciao = stockA.map((item) => {
    console.log(item);
    return fetchGetItems<IStock>(`${item}/range/1/day/${date}/${date}`).then(
      (data) => {
        console.log(data);
        setDataProvider([...dataProvider, data]);
      }
    );
  });
 */

  console.log(dataProvider);

  return (
    <Box mt={"10px"} position={"relative"} pt={"50px"}>
      <Box position={"absolute"} right={"33px"} top={"-12px"}>
        <FormTitle />
      </Box>
      <VStack
        justifyContent={"space-around"}
        px={"100px"}
        alignItems={"flex-start"}
      >
        <Box p={"30px"} border={"1px solid black"} borderRadius={"15px"}>
          <Text fontSize="2xl" mb={"30px"}>
            Portafoglio
          </Text>
          <Table>
            <Thead>
              <Tr>
                <Th>Isin</Th>
                <Th>Quantità</Th>
                <Th>Prezzo d'acquisto</Th>
                <Th>Prezzo attuale</Th>
                <Th>Profitto</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items?.data?.map((item) => {
                const { attributes, id } = item;
                return (
                  <Tr key={"isin:" + attributes?.isin}>
                    <Td>
                      <Box>{attributes?.isin}</Box>
                    </Td>
                    <Td>{attributes?.quantity}</Td>
                    <Td>{attributes?.price}</Td>
                    {dataProvider.map((data) => {
                      return (
                        <>
                          <Td>{data?.close}</Td>
                          <Td>
                            {(data?.close - attributes?.price) *
                              attributes?.quantity}
                          </Td>
                        </>
                      );
                    })}
                    <Td>
                      <Button
                        onClick={() => {
                          deleteStock(id);
                        }}
                      >
                        X
                      </Button>
                      <Button
                        onClick={() => {
                          editStock(id);
                        }}
                      >
                        Modifica
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Totale portafoglio</Th>
                <Th></Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
        <Box width={"50%"}>
          <PieChart width={800} height={400}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            />
          </PieChart>
        </Box>
      </VStack>
    </Box>
  );
}

export default Wallet;
