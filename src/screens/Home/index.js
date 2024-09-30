import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet} from 'react-native';

const Home = ()=>{

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
              Alert.alert('Error fetching appointments');
            });
        }
      }, [user]);
    
      // Book a New Appointment
      const handleBookAppointment = () => {
        if (!date || !time) {
          Alert.alert('Please enter both date and time');
          return;
        }
    
        const appointment = { date, time, userId: user.uid };
        axios.post('http://localhost:3000/appointments', appointment)
          .then(() => {
            Alert.alert('Appointment booked successfully');
            setAppointments([...appointments, appointment]);
            setDate('');
            setTime('');
          })
          .catch(error => {
            Alert.alert('Error booking appointment');
          });
      };
  return (
    <View style={styles.Container}>
        <Text>Welcome, {user.email}</Text>
          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD)"
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Time (HH:MM)"
            value={time}
            onChangeText={setTime}
          />
          <Button title="Book Appointment" onPress={handleBookAppointment} />
          <FlatList
            data={appointments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text>{item.date} at {item.time}</Text>
            )}
          />
    </View>
    
  );
};

const styles = StyleSheet.create({
  Container:{
    width:100,
    paddingTop:80,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  Title:{
    fontSize:20,
    fontWeight:'bold',
  },
})

export default Home;