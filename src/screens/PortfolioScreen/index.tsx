import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import styles from './styles';
import PortfolioCoin from "../../components/PortfolioCoin";
const image =  require('../../../assets/images/portfolio.jpg');

const portfolioCoins = [{
    id: '1',
    name: 'Virtual Dollars',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
    symbol: 'USD',
    amount: 10,
    valueUSD: 10000,
}, {
    id: '2',
    name: 'Bitcoin',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
    symbol: 'USD',
    amount: 10,
    valueUSD: 20000,
}, {
    id: '3',
    name: 'Etherium',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
    symbol: 'ETH',
    amount: 10,
    valueUSD: 30000,
}]

const PortfolioScreen = () => {
    return (
        <View style={styles.root}>
            <Image style={styles.image} source={image} />
            <View style={styles.balanceContainer}>
                <Text style={styles.label}>Portfolio balance</Text>
                <Text style={styles.balance}>$100</Text>
            </View>

            <FlatList
                style={{width: '100%'}}
                data={portfolioCoins}
                renderItem={({item}) => <PortfolioCoin portfolioCoin={item} />}
            />
        </View>
    );
};

export default PortfolioScreen;
