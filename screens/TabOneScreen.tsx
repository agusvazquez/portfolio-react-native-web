import React from "react";
import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Button } from "react-native-elements";
import Deck from "../components/Deck";

const DATA = [
  {
    id: 1,
    title: "Card 1",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
  },
  {
    id: 2,
    title: "Card 2",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
  },
  {
    id: 3,
    title: "Card 3",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
  },
  {
    id: 4,
    title: "Card 4",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
  },
  {
    id: 5,
    title: "Card 5",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
  },
];

type ItemType = {
  id: number;
  title: string;
  uri: string;
};

export default function TabOneScreen() {
  const [data, setData] = useState<ItemType[]>(DATA);

  const fetchMorePressed = () => {
    setData([...DATA]);
  };

  const renderCard = (item: ItemType) => {
    return (
      <Card>
        <Card.Image source={{ uri: item.uri }} />
        <Card.Title>{item.title}</Card.Title>
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
      <Deck
        data={data}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
