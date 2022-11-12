import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import SvgBar from "../svgs/SvgBar";

const ItemNavigationDrawer = (props: any) => {
  const { onPress, label, tabChose, tabActive } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}
    >
      <Text style={styles.label}>{label}</Text>
      <SvgBar
        tabChose={tabChose}
        tabActive={tabActive}
        style={styles.bar}
      />
    </TouchableOpacity>
  );
};

export default ItemNavigationDrawer;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    justifyContent: "center",
    height: 50,
    paddingLeft: 40,
  },
  label: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  bar: {
    position: "absolute",
    left: 0,
  },
});
