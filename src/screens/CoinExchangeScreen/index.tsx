import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useRoute } from '@react-navigation/native'
import {API, graphqlOperation} from 'aws-amplify'
import {exchangeCoins} from '../../graphql/mutations'
const image =  require('../../../assets/images/money-transfer.png')
import styles from './styles';


const CoinExchangeScreen = () => {
    const [coinAmount, setCoinAmount] = useState('')
    const [coinUSDValue, setCoinUSDValue] = useState('')

    const maxUSD = 100000; // TODO Fetch from API

    const route = useRoute();

    const isBuy = route?.params?.isBuy;
    const coin = route?.params?.coin;
    const portfolioCoin = route?.params?.portfolioCoin;

    useEffect(() => {
        const amount = parseFloat(coinAmount)
        if (!amount && amount !== 0) {
            setCoinAmount("");
            setCoinUSDValue("");
            return;
        }
        setCoinUSDValue((amount * coin?.currentPrice).toString());
    }, [coinAmount]);

    useEffect(() => {
        const amount = parseFloat(coinUSDValue)
        if (!amount && amount !== 0) {
            setCoinAmount("");
            setCoinUSDValue("");
            return;
        }
        setCoinAmount((amount / coin?.currentPrice).toString());
    }, [coinUSDValue]);

    const placeOrder = async () => {
        try {
            const response = await API.graphql(
                graphqlOperation(
                    exchangeCoins, {
                        coinId: coin.id,
                        isBuy,
                        amount: parseFloat(coinAmount),
                    }
                )
            )
        } catch (e) {
            console.error(e);
        }
    }

    const onPlaceOrder = async () => {
        if (isBuy && parseFloat(coinUSDValue) > maxUSD) {
            Alert.alert('Error', `Not enough USD coins. Max: ${maxUSD}`);
            return;
        }
        if (!isBuy && !portfolioCoin || parseFloat(coinAmount) > portfolioCoin.amount) {
            Alert.alert('Error', `Not enough ${coin.symbol} coins. Max: ${coin.amount || 0}`);
            return;
        }

        await placeOrder();
    }

    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
        >
            <Text style={styles.title}>
                {isBuy ? 'Buy ' : "Sell "}
                {coin?.name}
            </Text>
            <Text style={styles.subtitle}>
                1 {coin?.symbol}
                {' = '}
                ${coin?.currentPrice}
            </Text>
            <Image style={styles.image} source={image} />

            <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        keyboardType="decimal-pad"
                        placeholder="0"
                        value={coinAmount}
                        onChangeText={setCoinAmount}
                    />
                    <Text>{coin?.symbol}</Text>
                </View>
                <Text style={{fontSize: 30}}>=</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        keyboardType="decimal-pad"
                        placeholder="0"
                        value={coinUSDValue}
                        onChangeText={setCoinUSDValue}
                    />
                    <Text>USD</Text>
                </View>
            </View>

            <Pressable style={styles.button} onPress={onPlaceOrder}>
                <Text style={styles.buttonText}>Place Order</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
};

export default CoinExchangeScreen;
