import React, { useContext } from "react";

import { View, ActivityIndicator } from 'react-native';

import { AppRoutes } from "./app.routes";
import AuthRoutes from "./auth.routes";

import { AuthContext } from "../contexts/AuthContext";

function Routes() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const loading = false;

  if(loading) {
    return (
      <View 
        style={{ 
          flex: 1, 
          backgroundColor: '#FFF', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}
      >
        <ActivityIndicator size={30} color="green" />
      </View>
    )
  }

  return (
    isAuthenticated ? 
    user.role === 'user' ? <AppRoutes /> : <AuthRoutes />
    : <AuthRoutes />
  )
}

export default Routes;