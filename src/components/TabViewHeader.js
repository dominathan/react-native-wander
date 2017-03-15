import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Make a Component


const TabViewHeader = (props) => {
    const { imageViewStyle,
            profileImageStyle,
            textStyle,
            textViewStyle,
            viewStyle
    } = styles;

    const goToProfile = () => {
      props.drawer.close();
      Actions.profile({person: props.user})
    }

    return (
      <TouchableOpacity onPress={() => goToProfile()}>
        <View style={viewStyle}>
            <View style={imageViewStyle}>
                <Image style={profileImageStyle} source={{ uri: props.user.photo_url }} />
            </View>
            <View style={textViewStyle}>
                <Text style={textStyle}>{props.user.first_name} {props.user.last_name}</Text>
                <Text style={textStyle}>{props.user.email}</Text>
            </View>
        </View>
      </TouchableOpacity>
    );
};

const styles = {
    imageViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 37.5,
        marginRight: 15,
        marginLeft: 15
    },
    profileImageStyle: {
        width: 75,
        height: 75,
        borderRadius: 37.5
    },
    textStyle: {
        fontSize: 20,
        color: '#8D8F90'
    },
    textViewStyle: {
        height: 50,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    viewStyle: {
        backgroundColor: '#333B42',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 20,
        height: 60,
        paddingTop: 15
    }
};

// Make the component available to other parts of the app
export default TabViewHeader;
