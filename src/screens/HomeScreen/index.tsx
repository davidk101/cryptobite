import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
const image = require('../../../assets/images/logo.png');

const HomeScreen = () =>{

    return (
        <View style = {styles.root}>
            <Image style = {styles.image} source = {image} />
            <Text style = {styles.header1}>Welcome to CryptoBite!</Text>
            <Text style = {styles.header2}>Use blockchain hashing algorithms to mine CryptoBite and make real-time investments in the crypto market!</Text>
        </View>
    );

}

export default HomeScreen;
