import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import styles from './styles';
import MarketCoin from "../../components/MarketCoin";
const image =  require('../../../assets/images/market.png');
import {listCoins} from '../../graphql/queries'
import {API, graphqlOperation} from 'aws-amplify'


const MarketScreen = () =>{

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchCoins = async() =>{

        setLoading(true);
        try{
            const response = await API.graphql(graphqlOperation(listCoins));
            setCoins(response.data.listCoins.items);
        }
        catch (e){
            console.error(e);
        }

        finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        fetchCoins();

    }, [])

    return (
        <View style={styles.root}>
            <FlatList
                style={{width: '100%'}}
                data={coins}
                onRefresh={fetchCoins}
                refreshing={loading}
                renderItem={({item}) => <MarketCoin marketCoin={item} />}
                showsVerticalScrollIndicator={false}
                ListHeaderComponentStyle={{alignItems: 'center'}}
                ListHeaderComponent={() => (
                    <>
                        <Image style={styles.image} source={image} />
                        <Text style={styles.label}>Market</Text>
                    </>
                )}
            />
        </View>
    );
};

export default MarketScreen;
