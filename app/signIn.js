import { StyleSheet, Text, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {React, useRef, useState} from 'react';
import { StatusBar } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import COLORS from '../constants/Colors'
import Loading from '../components/Loading';
import { useAuth } from '../context/authContext';


const SignIn = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const {login} = useAuth();
  const [loading, setLoading] = useState(false);
  const handleLogin = async () =>{
    if(!emailRef.current || !passwordRef.current){
      Alert.alert('Вход', 'Пожалуйста, заполните все поля')
      return;
    }
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);

    if(!response.success){
      Alert.alert('Вход', response.msg);
    }
    //login process
  }
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Контейнер для изображения и текста */}
      <View style={styles.contentContainer}>
        {/* Изображение */}
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../assets/images/signin.jpg')}
        />
        
        {/* Текст */}
        <Text style={styles.signIn}>Вход</Text>
        <View style={styles.inputArea}>
          <Octicons name='mail' size={hp(2)} color='gray'/>
          <TextInput onChangeText={(value) => emailRef.current = value } style={styles.input} placeholder='Ваш Email'/>
        </View>
        <View style={styles.inputArea}>
          <Octicons name='key' size={hp(2)} color='gray'/>
          <TextInput secureTextEntry onChangeText={(value) => passwordRef.current = value } style={styles.input} placeholder='Ваш пароль'/>
        </View>
        <Text style={styles.forgotPasswrod}>Забыли пароль?</Text>

        <View>
          {loading ? 
          (
            <View>
              <Loading size={hp(6.5)}/>
            </View>
          ) 
          :
          (
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>
          )}
        </View>

        <View styles={styles.haveNotAccount}>
          <Text>У вас еще нет аккаунта?</Text>
          <Pressable onPress={() => router.push('signUp')} style={styles.register}>
            <Text style={styles.registerText}>Зарегистрироваться</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center', // Центрируем содержимое по горизонтали
  },
  image: {
    width: wp(80), // 80% ширины экрана
    height: hp(30), // 30% высоты экрана (можно настроить)
  },
  signIn: {
    fontSize: 30,
    fontWeight: '700', // Используйте строку для значения fontWeight
    color: '#000',
    marginTop: 20, // Отступ сверху, чтобы текст не прилипал к изображению
  },
  input:{
    fontSize: hp(2),
    flex: 1,
    marginLeft: 20,
  },
  inputArea:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(1.5),
    borderRadius: 10,
    backgroundColor: COLORS.gray,
    width: wp(90),
    marginTop: hp(1.5),
  },
  forgotPasswrod: {
    marginTop: hp(1),
    width: '100%',
    alignSelf: 'flex-end',
  },
  button:{
    paddingVertical: 20,
    backgroundColor: COLORS.accent,
    width: wp(90),
    alignItems: 'center',
    marginTop: hp(3),
    marginBottom: hp(2),
    borderRadius: 15
  },
  buttonText:{
    color: '#fff',
  },
  haveNotAccount:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  register:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText:{
    color: COLORS.accent,
    fontWeight: 400
  }
});