import React, { memo, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Instructions from "../pages/Instructions";
import Achivements from "../pages/Achivements";
import Location from "../pages/Location";
import ItemNavigationDrawer from "../components/ItemNavigationDrawer";
import SignIn from "../pages/SignIn";
import { api } from '../services/api';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

type UserProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodType: string;
}

const screens = [
  { id: 0, label: "Início" },
  { id: 1, label: "Perfil" },
  { id: 2, label: "Conquistas" },
  { id: 3, label: "Instruções" },
  { id: 4, label: "Local de doação" },
  { id: 5, label: "Sair" },
];

const routes = {
  Achivements: "Achivements",
  Dashboard: "Dashboard",
  Instructions: "Instructions",
  Location: "Location",
  Notices: "Notices",
  Profile: "Profile",
  SignIn: "SignIn",
  SignUp: "SignUp",
};

const DrawerNavigator = memo(() => {
  const [tabActive, setTabActive] = useState(0);

  const onNavigate = (key: any, props: any) => {
    switch (key) {
      case 0:
        props.navigation.navigate('Início');
        break;
      case 1:
        props.navigation.navigate('Perfil');
        break;
      case 2:
        props.navigation.navigate('Conquistas');
        break;
      case 3:
        props.navigation.navigate('Instruções');
        break;
      case 4:
        props.navigation.navigate('Local de doação');
        break;
      case 5:
        props.navigation.navigate('Sair');
        break;
    }
  };

  const DrawerContent = (props: any) => {
    const [user, setUser] = useState<UserProps>();

    useEffect(() => {
      (async () => {
        const response = await api.get('/user-detail');

        setUser(response.data);
      })();
    }, []);
    return (
      <DrawerContentScrollView 
        {...props}
        bounces={false}
        showsVerticalScrollIndicator={false}  
      >
        <Text style={styles.nameText}>{user?.name}</Text>
        {user?.bloodType === 'APositivo' && 
          <Text style={styles.bloodText}>A+</Text>
        }
        {user?.bloodType === 'BPositivo' && 
          <Text style={styles.bloodText}>B+</Text>
        }
        {user?.bloodType === 'ABPositivo' && 
          <Text style={styles.bloodText}>AB+</Text>
        }
        {user?.bloodType === 'ANegativo' && 
          <Text style={styles.bloodText}>A-</Text>
        }
        {user?.bloodType === 'BNegativo' && 
          <Text style={styles.bloodText}>B-</Text>
        }
        {user?.bloodType === 'ABNegativo' && 
          <Text style={styles.bloodText}>AB-</Text>
        }
        {user?.bloodType === 'OPositivo' && 
          <Text style={styles.bloodText}>O+</Text>
        }
        {user?.bloodType === 'ONegativo' && 
          <Text style={styles.bloodText}>O-</Text>
        }
        {screens.map((item, index) => {
          const { id, label } = item;
          return (
            <ItemNavigationDrawer 
              key={index}
              label={label}
              tabChose={id}
              tabActive={tabActive}
              onPress={() => {
                setTabActive(id);
                onNavigate(id, props);
              }}
            />
          )
        })}
      </DrawerContentScrollView>
    )
  }

  return (
    <View style={styles.container}>
      <Drawer.Navigator 
        initialRouteName={routes.Dashboard}
        drawerContent={(props) => { return <DrawerContent {...props} />; }}
      >
        <Drawer.Screen name='Início' component={Dashboard} />
        <Drawer.Screen name='Perfil' component={Profile} />
        <Drawer.Screen name='Conquistas' component={Achivements} />
        <Drawer.Screen name='Instruções' component={Instructions} />
        <Drawer.Screen name='Local de doação' component={Location} />
        <Drawer.Screen name='Sair' component={SignIn} />
      </Drawer.Navigator>
    </View>
  );
})

export default DrawerNavigator;

export function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Drawer" component={DrawerNavigator} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  bloodText: {
    fontSize: 20,
    lineHeight: 20,
    color: "#3A9C7F",
    marginBottom: 45,
    marginLeft: 40,
    fontWeight: "bold",
  },
  nameText: {
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "700",
    textTransform: "uppercase",
    marginTop: 10,
    letterSpacing: 0.5,
    marginLeft: 40,
  },
});