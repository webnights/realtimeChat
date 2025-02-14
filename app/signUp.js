import { StyleSheet, Text, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {React, useRef, useState} from 'react';
import { StatusBar } from 'react-native';
import { AntDesign, Octicons, EvilIcons, FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import COLORS from '../constants/Colors'
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';


const SignUp = () => {
  const router = useRouter();
  const {register} = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const profileRef = useRef("");
  const [loading, setLoading] = useState(false);
  const handleRegister = async () =>{
    if(!emailRef.current || !passwordRef.current || !profileRef.current || !userNameRef.current){
      Alert.alert('Регистрация', 'Пожалуйста, заполните все поля')
      return;
    }
    setLoading(true);

    let response = await register(emailRef.current, passwordRef.current, userNameRef.current, profileRef.current)

    setLoading(false);

    console.log('got result: ', response);
    if(!response.success){
      Alert.alert('Регистрация', response.msg)
    }
    //login process
  }
  return (
    <CustomKeyboardView>
     <View style={styles.container}>
     <StatusBar style="dark" />
      
      {/* Контейнер для изображения и текста */}
      <View style={styles.contentContainer}>
        {/* Изображение */}
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../assets/images/signUp.png')}
        />
        
        {/* Текст */}
        <Text style={styles.signIn}>Регистрация</Text>
        <View style={styles.inputArea}>
          <AntDesign name='user' size={hp(2)} color='gray'/>
          <TextInput onChangeText={(value) => userNameRef.current = value } style={styles.input} placeholder='Ваше имя'/>
        </View>
        <View style={styles.inputArea}>
          <Octicons name='mail' size={hp(2)} color='gray'/>
          <TextInput onChangeText={(value) => emailRef.current = value } style={styles.input} placeholder='Ваш Email'/>
        </View>
        <View style={styles.inputArea}>
          <Octicons name='key' size={hp(2)} color='gray'/>
          <TextInput secureTextEntry onChangeText={(value) => passwordRef.current = value } style={styles.input} placeholder='Ваш пароль'/>
        </View>
        <View style={styles.inputArea}>
          <FontAwesome name='image' size={hp(2)} color='gray'/>
          <TextInput  onChangeText={(value) => profileRef.current = value } style={styles.input} placeholder='Ссылка на аватарку'/>
        </View>
        <View>
          {loading ? 
          (
            <View>
              <Loading size={hp(6.5)}/>
            </View>
          ) 
          :
          (
          <TouchableOpacity onPress={handleRegister} style={styles.button}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>
          )}
        </View>

        <View styles={styles.haveNotAccount}>
          <Text>Уже есть аккаунт?</Text>
          <Pressable onPress={() => router.push('signIn')} style={styles.register}>
            <Text style={styles.registerText}>Войти</Text>
          </Pressable>
        </View>
      </View>
     </View>
    </CustomKeyboardView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center', // Центрируем содержимое по горизонтали
  },
  image: {
    width: wp(80), // 80% ширины экрана
    height: hp(20), // 30% высоты экрана (можно настроить)
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