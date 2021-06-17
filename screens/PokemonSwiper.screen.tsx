import { ApiResponse } from "apisauce";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { Card, Button } from "react-native-elements";

import { ColorTheme, useTheme } from "../theme/Theme.interface";

import { getPokemon, getPokemonDetail } from "../api/pokemon.api";
import Deck from "../components/Deck";
import Loading from "../components/Loading";

type ItemType = {
  id: number;
  name: string;
  uri: string;
};

const LIST_SIZE = 10;

export default function PokemonSwiper() {
  const [data, setData] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    setLoading(true);
    getPokemon(LIST_SIZE, offset).then(async (response: ApiResponse<any>) => {
      if (response.ok) {
        const promises = response.data.results.map(async (item: ItemType) => {
          const responseDetails = (await getPokemonDetail(
            item.name
          )) as ApiResponse<any>;
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
        setLoading(false);
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
        <Card.Title>{name.charAt(0).toUpperCase() + name.slice(1)}</Card.Title>
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
      {data != null && loading == false && (
        <Deck
          keyExtractor={(item) => item.name}
          data={data}
          renderCard={renderCard}
          renderNoMoreCards={renderNoMoreCards}
        />
      )}

      <Loading loading={loading} />
    </View>
  );
}

const createStyles = (theme: ColorTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
  return styles;
};
