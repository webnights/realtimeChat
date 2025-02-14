import { Platform, StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../constants/Colors'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { blurhash } from '../constants/blurhash';
import { Image } from 'expo-image';
import { useAuth } from '../context/authContext';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import MenuItem from './MenuItem';
import { Feather } from '@expo/vector-icons';

const ios = Platform.OS == 'ios';



const HomeHeader = () => {
    const {user, logout} = useAuth();
    const {top} = useSafeAreaInsets();

    const handleProfile = () =>{

    }
    
    const handleLogout = async() =>{
      await logout();
    }

  return (
    <View style={{paddingTop: ios? top : top + 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.accent, paddingBottom: 15, paddingHorizontal: 20, borderRadius: 20 }}>
      <View>
        <Text style={styles.text}>Чаты</Text>
      </View>

      <View >
      <Menu >
        <MenuTrigger customStyles={{

        }}>
          <Image
          style={{height: hp(4.3), aspectRatio: 1, borderRadius: 100}}
          source={user?.profileUrl}
          placeholder={{ blurhash }}
          transition={500}
          />
        </MenuTrigger>
        <MenuOptions customStyles={{
          optionsContainer:{
            borderRadius: 5,
            borderCurve: 'continuous',
            marginTop: 40,
            marginLeft: -30,
            backgroundColor: 'white',
            shadowOpacity: 0.2,
            shadowOffset: {width: 0, height: 0},
            width: wp(50)
          }
        }}>
          <MenuItem
            text={"Профиль"}
            action={handleProfile}
            value={null}
            icon={<Feather name='user' size={hp(2.5)} color={COLORS.accent}/>}

          />
          <Divider/>
          <MenuItem
            text={"Выйти"}
            action={handleLogout}
            value={null}
            icon={<Feather name='log-out' size={hp(2.5)} color={COLORS.accent}/>}

          />
      </MenuOptions>
      </Menu>
      </View>
    </View>
  )
}

const Divider = () =>{
  return (
    <View style={{width: '100%', height: 0.5, backgroundColor: '#000', marginVertical: 5}}>

    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
    text:{
        fontSize: hp(2),
        fontWeight: 600,
        textTransform: 'uppercase',
        color: '#fff'

    }
})