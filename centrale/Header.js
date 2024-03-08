import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Header = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row", margin: 15 }}>
      {props.name == "1" ? (
        <>
          <Image
            style={{ height: 25, width: 25,marginLeft:180}}
            source={require("./assets/search.png")}
          />
          <Pressable
          onPress={() => navigation.navigate('profile')}
          >
          <Image
            style={{ height: 25, width: 25,marginLeft:30}}
            source={require("./assets/profile.png")}
          />
          </Pressable>
           
        </>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

export default Header;
