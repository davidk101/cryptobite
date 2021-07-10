import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    image: {
        height: 350,
        width: 350,
        resizeMode: "contain",
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
