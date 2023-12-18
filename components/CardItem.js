import React from "react";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";

const CardItem = ({ children }) => {
  return (
    <Card style={styles.Card}>
      <Card.Content style={styles.CardContent}>{children}</Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  Card: {
    // margin: 5,
    backgroundColor:"#FAFAFA",
    // borderRadius:0
    // flex:1
  },
  CardContent: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
export default CardItem;
