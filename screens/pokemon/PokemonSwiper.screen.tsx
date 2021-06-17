import { ApiResponse } from "apisauce";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { ColorTheme, useTheme } from "../../theme/Theme.interface";

import { getPokemon, getPokemonDetail } from "../../api/pokemon.api";
import Deck from "../../components/Deck.component";
import Loading from "../../components/Loading.component";
import { Background } from "../../components/ui.component";

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

  const navigation = useNavigation();

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

        <Button
          title="View Now!"
          onPress={() => navigation.navigate("PokemonDetails", item)}
        />
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
    <Background>
      <Text style={styles.headerText}>Swipe the card</Text>
      {data != null && loading == false && (
        <Deck
          keyExtractor={(item) => item.name}
          data={data}
          renderCard={renderCard}
          renderNoMoreCards={renderNoMoreCards}
        />
      )}

      <Loading loading={loading} />
    </Background>
  );
}

const createStyles = (theme: ColorTheme) => {
  const styles = StyleSheet.create({
    headerText: {
      color: theme.onPrimary,
      fontSize: 16,
      fontWeight: "bold",
      marginVertical: 10,
      alignSelf: "center",
    },
  });
  return styles;
};
