import { View, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/Colors";

const PageLoader = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default PageLoader;
