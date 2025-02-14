import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router'
import "../global.css";
import {AuthContextProvider, useAuth } from '../context/authContext';
import { MenuProvider } from 'react-native-popup-menu';
const MainLayout = () =>{
  const {isAuthenticated} = useAuth();
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    if(typeof isAuthenticated == 'undefined'){
      return;
    }
    const inApp = segments[0]=='(app)';
    
    if(isAuthenticated && !inApp){
      //redirect home
      router.replace('home')
    }
    else if(isAuthenticated===false){
      //redirect sign in
      router.replace('signIn')
    }

  }, [isAuthenticated])

  return <Slot/>
}
const RootLayout = () => {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout/>
      </AuthContextProvider>
    </MenuProvider>
  )
}

export default RootLayout;
