import React, {useState } from 'react';
import { StyleSheet,TextInput, View,Button} from 'react-native';
import{createUserWithEmailAndPassword} from"firebase/auth";
import { auth } from '../../Services/firebaseConfig';

const Login = ({setUser})=>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
  
    const handleLogin = ()=>{
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setUser(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
    }
  return (
    <View style={styles.container}>
         <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8
  },
});
export default Login;