import React from "react";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const MenuBar = ({ visible, mod, del, showMenu, hideMenu }) => {
  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        anchor={
          <Ionicons
            onPress={showMenu}
            name="ellipsis-vertical"
            size={18}
            color="#8A8A8A"
          />
        }
        onRequestClose={hideMenu}
      >
        <MenuItem style={styles.style} textStyle={styles.itemMod} onPress={mod}>
          <FontAwesome size={18} color="#ABABAB" name="edit" />
          수정
        </MenuItem>
        <MenuDivider />
        <MenuItem textStyle={styles.itemDel} style={styles.style} onPress={del}>
          <Ionicons size={20} color="#FF1B00" name="trash-outline" />
          삭제
        </MenuItem>
      </Menu>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  style: {
    alignItems: "center",
  },
  itemMod: {
    fontSize: 18,
    color: "#ABABAB",
  },
  itemDel: {
    fontSize: 18,
    color: "#FF1B00",
  },
});

export default MenuBar;
