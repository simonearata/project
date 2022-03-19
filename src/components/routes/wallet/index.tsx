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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IItemContext, useItem } from "../../../provider/item-provider";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import FormTitle from "../../form-title";
import { fetchApiDelete, fetchApiGet, fetchApiPut } from "../../../api";
import { IITem, IItemResponse } from "../../../interfaces/i-items";

function Wallet() {
  const { items, setItems, setTakeId, editStock }: IItemContext = useItem();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchApiGet<IItemResponse>("stocks")
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
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

  return (
    <Box mt={"10px"} position={"relative"} pt={"50px"}>
      <Box position={"absolute"} right={"33px"} top={"-12px"}>
        <FormTitle />
      </Box>
      <HStack
        justifyContent={"space-around"}
        px={"100px"}
        alignItems={"flex-start"}
      >
        <Box
          p={"30px"}
          border={"1px solid black"}
          borderRadius={"15px"}
          width={"50%"}
        >
          <Text fontSize="2xl" mb={"30px"}>
            Portafoglio
          </Text>
          <Table>
            <Thead>
              <Tr>
                <Th>Isin</Th>
                <Th>Quantità</Th>
                <Th>Prezzo d'acquisto</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {items?.data?.map((item, index) => {
                const { attributes, id } = item;
                return (
                  <Tr key={"isin:" + attributes?.isin}>
                    <Td>
                      <Box>{attributes?.isin}</Box>
                    </Td>
                    <Td>{attributes?.quantity}</Td>
                    <Td>{attributes?.price}</Td>
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
                          editStock(index);
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
        <Button
          onClick={() => {
            console.log(items.data);
          }}
        >
          cc
        </Button>
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
      </HStack>
    </Box>
  );
}

export default Wallet;
