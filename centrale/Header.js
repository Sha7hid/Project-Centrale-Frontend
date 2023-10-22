import { View, Text, Image } from "react-native";
import React from "react";

const Header = (props) => {
  return (
    <View style={{ flexDirection: "row", margin: 15 }}>
      {props.name == "1" ? (
        <>
          <Image
            style={{ height: 45, width: 45,marginLeft:150}}
            source={require("./assets/search.png")}
          />
           <Image
            style={{ height: 45, width: 45,marginLeft:30}}
            source={require("./assets/profile.png")}
          />
        </>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

export default Header;
