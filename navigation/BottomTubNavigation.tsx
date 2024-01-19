import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Image, StyleSheet, Text, View } from "react-native";

import CreateScreen from "../screens/CreateScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TrandsScreen from "../screens/TrandsScreen";

const Tab = createBottomTabNavigator();

const BottomTubNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: [
          {
            backgroundColor: "#191724",
            borderTopColor: "#191724",
            height: 85,
            display: "flex",
            paddingBottom: 0,
            padding: 11.42,
          },
          null,
        ],
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Trands"
        component={TrandsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.labelTab}>
              <AntDesign
                name="heart"
                size={20}
                color={focused ? "#A97DE0" : "#FFFFFF"}
              />
              <Text style={{ color: focused ? "#A97DE0" : "#FFFFFF" }}>
                Trends
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.labelTab}>
              <AntDesign
                name="plus"
                size={20}
                color={focused ? "#A97DE0" : "#FFFFFF"}
              />
              <Text style={{ color: focused ? "#A97DE0" : "#FFFFFF" }}>
                Create
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.labelTab}>
              <AntDesign
                name="home"
                size={20}
                color={focused ? "#A97DE0" : "#FFFFFF"}
              />
              <Text style={{ color: focused ? "#A97DE0" : "#FFFFFF" }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  labelTab: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    margin: 0,
    width: 50,
    marginBottom: 31.58,
  },
});

export default BottomTubNavigation;
