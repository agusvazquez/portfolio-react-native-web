import { ApiResponse } from "apisauce";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Linking } from "react-native";
import { Card, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { ColorTheme, useTheme } from "../../theme/Theme.interface";

import { getPokemon, getPokemonDetail } from "../../api/pokemon.api";
import Deck from "../../components/Deck.component";
import Loading from "../../components/Loading.component";
import { Background } from "../../components/ui.component";
import { PokemonListType } from "../../types";
import Fonts from "../../constants/fonts";

const LIST_SIZE = 10;
const POKEMON_WIKI_URL = "https://pokemon.fandom.com/es/wiki/";

export default function PokemonSwiper() {
  const [data, setData] = useState<PokemonListType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    setLoading(true);
    getPokemon(LIST_SIZE, offset).then(async (response: ApiResponse<any>) => {
      if (response.ok) {
        const promises = response.data.results.map(
          async (item: PokemonListType) => {
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
          }
        );

        const pokemonData = (await Promise.all(promises)) as PokemonListType[];

        setData(pokemonData);
        setLoading(false);
      }
    });
  }, [offset]);

  const fetchMorePressed = () => {
    setOffset(offset + LIST_SIZE);
  };

  const renderCard = (item: PokemonListType) => {
    const { name, uri } = item;

    const upperCasedName = name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <Card>
        <Card.Image style={{ resizeMode: "contain" }} source={{ uri }} />
        <Card.Title h4Style={styles.title} h4>{upperCasedName}</Card.Title>
        <Card.Divider />

        <Button
          titleStyle={styles.buttonTitle}
          title="View More"
          onPress={() => Linking.openURL(POKEMON_WIKI_URL + upperCasedName)}
        />
      </Card>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title style={styles.title}>All Done</Card.Title>
        <Card.Divider />

        <Button titleStyle={styles.buttonTitle} title="Fetch More" onPress={fetchMorePressed} />
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
      color: theme.primary,
      fontFamily: Fonts.bold,
      fontSize: 16,
      marginVertical: 10,
      alignSelf: "center",
    },
    title: {
      fontFamily: Fonts.bold, 
      fontWeight: 'normal', 
      color: theme.background
    },
    buttonTitle: {
      fontFamily: Fonts.bold,
    }
  });
  return styles;
};
