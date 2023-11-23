import React, {useState, useEffect} from 'react';
import { View,Text, TextInput, Button, StyleSheet, Image,Dimensions, TouchableOpacity, KeyboardAvoidingView, Keyboard  } from 'react-native';
const screenWidth = Dimensions.get('window').width;
import { loginApi } from './loginApi';

const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems: 'center',
      width:screenWidth,
      backgroundColor:'white',

    },
    input: {
      width: '80%',
      marginVertical: 10,
      padding: 10,
      borderBottomWidth: 1,
      borderColor: 'black',
    },
    image:{
        width: screenWidth ,
        height: '35%' ,
        resizeMode: 'cover',
    },
    login:{
        fontSize: 50,
        margin: 0,
    },
    customButton: {
        width: '35%',
        height: 50,
        backgroundColor: '#3498db',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
    buttonText: {
        color: 'white',
        fontSize: 18,
      },
  });
const Login = ({navigation, route}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const { setIsLoggedIn } = route.params;
    const [message, setMessage] = useState(false);
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
          setKeyboardOpen(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
          setKeyboardOpen(false);
        });
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);

    const handleLogin = () => {
        loginApi(username, password)
            .then(user => {
                // Đăng nhập thành công, thực hiện các hành động cần thiết (ví dụ: lưu thông tin người dùng vào trạng thái ứng dụng)
                // Sau đó, điều hướng đến màn hình Home
                setMessage(false);

                navigation.navigate('Welcome', { user:user });
            })
            .catch(error => {
                // Hiển thị thông báo lỗi nếu xác thực không thành công
                setMessage(true);
                Alert.alert('Error', error.message);
            });
      };

    return (
        <View style={styles.container}>
            {
                !keyboardOpen && (
                    <Image
                        source={require('../images/logo.jpg')} // Đường dẫn đến ảnh trong thư mục assets
                        style={styles.image}
                    />
                )
            }

            <Image
                source={require('../images/effect.png')}
                style={{width:'100%',height:50,marginTop:0,resizeMode:'stretch'}}
            />
            {/* <View style={{width:'80%'}}>
                <Text onPress={{}}>
                    {`< Back`}
                </Text>
            </View> */}
            <Text style={styles.login}>
                Login
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            {message &&
                <Text style={{width:'80%',textAlign:'left',color:'red'}}>Tài khoản hoặc mật khẩu không chính xác</Text>
            }
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            {/* <Button title="Login" onPress={handleLogin} style={styles.button} color={'black'} fontSize={'10px'} /> */}
            <View style={{width:'80%',alignItems:'flex-end',marginTop:30}}>
                <TouchableOpacity style={styles.customButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};


export default Login;
