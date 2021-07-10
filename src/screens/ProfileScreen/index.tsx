import React, { useState } from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import styles from './styles';
import {Auth} from "aws-amplify";
import {CommonActions, useNavigation} from "@react-navigation/native";
const image =  require('../../../assets/images/profile.png');

const ProfileScreen = () => {
    const [user, setUser] = useState({
        id: '1',
        name: "David",
        email: 'dab@gmail.com',
        image:'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
        netWorth: 12312,
    })

    const navigation = useNavigation();

    const signOut = async () => {
        await Auth.signOut();
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Welcome' },
                ],
            })
        );
    }

    return (
        <View style={styles.root}>
            <Image style={styles.image} source={image} />

            <View style={styles.userContainer}>
                <View style={styles.left}>
                    <Image style={styles.userImage} source={{ uri: user.image}} />
                    <View>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                    </View>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                    <Text style={styles.value}>${user.netWorth}</Text>
                </View>
            </View>

            <Pressable onPress={signOut} style={{marginTop: 'auto'}}>
                <Text>Sign out</Text>
            </Pressable>
        </View>
    );
};

export default ProfileScreen;
