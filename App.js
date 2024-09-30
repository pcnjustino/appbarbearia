import { useState,useEffect } from 'react';
import {Text,View,StyleSheet,TextInput,Button,FlatList,Alert} from 'react-native';
import Login from './src/screens/Login';
import axios from 'axios'
//import Home from './src/screens/Home';

export default function App() {
  const [user,setUser]=useState();
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  useEffect(() => {
    if (user) {
      axios.get('http://localhost:3000/appointments', { params: { userId: user.uid } })
        .then(response => {
          setAppointments(response.data);
        })
        .catch(error => {
          Alert.alert('sucesso ao buscar agendamento');
        });
    }
  }, [user]);

  // Book a New Appointment
  const handleBookAppointment = () => {
    if (!date || !time) {
      Alert.alert('Entre com a data e hora');
      return;
    }

    const appointment = { date, time, userId: user.uid };
    axios.post('http://localhost:3000/appointments', appointment)
      .then(() => {
        Alert.alert('Agendamento realizado com sucesso');
        setAppointments([...appointments, appointment]);
        setDate('');
        setTime('');
      })
      .catch(error => {
        Alert.alert('Erro no agendamento');
      });
  };
  return !user ? <Login setUser = {setUser}/> :  <View style={styles.Container}>
  <Text>Bem vindo, {user.email}</Text>
    <TextInput
      style={styles.input}
      placeholder="Data (YYYY-MM-DD)"
      value={date}
      onChangeText={setDate}
    />
    <TextInput
      style={styles.input}
      placeholder="Hora (HH:MM)"
      value={time}
      onChangeText={setTime}
    />
    <Button title="Agendar" onPress={handleBookAppointment} />
    <FlatList
      data={appointments}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Text>{item.date} at {item.time}</Text>
      )}
    />
</View>;
};

const styles = StyleSheet.create({
  Container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingTop:200
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8
  },
})

