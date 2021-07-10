import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
const image =  require('../../../assets/images/logo.png');

/*
*Crypto
*wallet -> public and private key
*use public address for transactions
*mining: validating transactions and minting coins from blocks
*mining: POW and POS
*POW: using compute power to solve puzzles which in turn validate transactions with specific encryption algorithms and mine coins
*POS: being a shareholder to launch nodes to validate transactions and mine coins
*hashrate: number of solution algorithm attempts per second
*
*/
const HomeScreen = () => {
    return (
        <View style={styles.root}>
            <Image style={styles.image} source={image} />
            <Text style={styles.header1}>Welcome to CryptoBite{'\u023c'}</Text>
            <Text style={styles.header2}>Use Proof-Of-Stake algorithms to invest {'\u023c'}100 in a real-time cryptocurrency market!</Text>
        </View>
    );
};

export default HomeScreen;
