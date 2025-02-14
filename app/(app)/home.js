import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { Button } from 'react-native'
import { StatusBar } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native'
import ChatList from '../../components/ChatList'
import { getDocs, query, where } from 'firebase/firestore'
import { usersRef } from '../../firebaseConfig'

const Home = () => {
  const {logout, user} = useAuth();
  const [users, setUsers] = useState([])
  useEffect( () =>{
    if(user?.uid){
       getUsers();
    }
  }, [])
  const getUsers = async() =>{
    const q = query(usersRef, where('userId', '!=', user?.uid))
    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach(doc => {
      data.push({...doc.data()});
    })

    setUsers(data)
  }
  const handleLogout = async () =>{
    await logout();
  }
  return (
    <View style={styles.home}>
      <StatusBar style='light'/>

      {
        users.length > 0? (
          <ChatList currentUser={user} users={users}/>
        ):
        (
          <View>
            <ActivityIndicator size="large" color='gray'/>
          </View> 
        )
      }
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  home:{
    height: '100%',
    justifyContent: 'center'
  }
})