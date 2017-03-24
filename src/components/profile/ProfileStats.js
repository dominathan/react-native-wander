import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileStats = (props) => {
  return (
    <View style={styles.containerStyle}>
        <Text style={styles.labelStyle}>{props.label.toUpperCase()}</Text>
        <Text style={styles.iconStyles}><Icon name={props.icon} size={16} color={'#4296cc'} /> {props.data}</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
      flex: 1,
      alignItems: 'stretch',
      borderColor: 'lightgray',
      borderWidth: 1,
      borderRadius: 1,
      height: 50,
      padding: 5,
      margin: 5
  },
  iconStyles: {
    color: '#4296cc',
    fontWeight: 'bold',
    fontSize: 16
  },
  labelStyle: {
      fontSize: 10,
      color: 'gray',
      fontWeight: 'bold',
      marginBottom: 2
  }
};

export default ProfileStats;
