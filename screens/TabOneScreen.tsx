import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Button } from "react-native-elements";

import { getPokemon, getPokemonDetail } from "../api/pokemon.api";
import Deck from "../components/Deck";

type ItemType = {
  id: number;
  name: string;
  uri: string;
};

const LIST_SIZE = 10;

export default function TabOneScreen() {
  const [data, setData] = useState<ItemType[]>([]);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    getPokemon(10, offset).then(async (response) => {
      console.log(response);
      if (response.ok) {
        const promises = response.data.results.map(async (item: ItemType) => {
          const responseDetails = await getPokemonDetail(item.name);
          console.log(responseDetails);
          if (responseDetails.ok) {
            const uri =
              responseDetails.data.sprites.other["official-artwork"]
                .front_default;
            return { ...item, uri };
          } else {
            return { ...item, uri: "" };
          }
        });

        const pokemonData = (await Promise.all(promises)) as ItemType[];

        setData(pokemonData);
      }
    });
  }, [offset]);

  const fetchMorePressed = () => {
    setOffset(offset + LIST_SIZE);
  };

  const renderCard = (item: ItemType) => {
    const { name, uri } = item;

    return (
      <Card>
        <Card.Image style={{ resizeMode: "contain" }} source={{ uri }} />
        <Card.Title>{name}</Card.Title>
        <Card.Divider />

        <Button title="View Now!" />
      </Card>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>All Done</Card.Title>
        <Card.Divider />

        <Button title="Fetch More" onPress={fetchMorePressed} />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {data != null && (
        <Deck
          keyExtractor={(item) => item.name}
          data={data}
          renderCard={renderCard}
          renderNoMoreCards={renderNoMoreCards}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
