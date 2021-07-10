import React, {useContext, useEffect} from 'react';
import {View, Text, Image, Pressable, Platform} from 'react-native';
import { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import styles from './styles';
import {useNavigation, CommonActions} from "@react-navigation/native";

const image =  require('../../../assets/images/logo.png');
const googleButtonImage =  require('../../../assets/images/google-sign-in.png');
//const appleButtonImage =  require('../../../assets/images/apple-sign-up.png');

const WelcomeScreen = () => {
    const navigation = useNavigation();
    //const { setUserId } = useContext(AppContext);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await Auth.currentAuthenticatedUser();
            if (user) {
                //setUserId(user.attributes.sub)
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Root' },
                        ],
                    })
                );
            }
        }

        fetchUser();
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            const user = await Auth.currentAuthenticatedUser();
            if (user) {
                console.log('user data')
                console.log(user);

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Root' },
                        ],
                    })
                );
            }
        }

        fetchUser();
    }, [])

    const signInGoogle = async () => {
        await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google});
    }

    const signInApple = async () => {
        await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Apple });
    }

    return (
        <View style={styles.root}>
            <Image style={styles.image} source={image} />
            <Text style={styles.header1}>Welcome to VCrypto</Text>
            <Text style={styles.header2}>Invest your virtual $100.000 and compete with others</Text>

            <Pressable onPress={signInGoogle} style={styles.googleButton}>
                <Image style={styles.buttonImage} source={googleButtonImage} />
            </Pressable>
        </View>
    );
};

export default WelcomeScreen;
