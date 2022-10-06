import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { useIsFocused } from '@react-navigation/native';


export default function App(props) {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);

    const _slow = () => {
        Gyroscope.setUpdateInterval(1000);
    };

    const _fast = () => {
        Gyroscope.setUpdateInterval(16);
    };

    const _subscribe = () => {
        setSubscription(
            Gyroscope.addListener(gyroscopeData => {
                setData(gyroscopeData);
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const { x, y, z } = data;

    const isFocused = useIsFocused();

    if(props.route.name!='Testing'){
        return null;
    }

    return (
        <View style={styles.container}>
            <Text>isFocused:{JSON.stringify(isFocused)}</Text>
            <Text>Props:{JSON.stringify(props)}</Text>
            <Text style={styles.text}>Gyroscope:</Text>
            {Math.abs(x) + Math.abs(y) + Math.abs(z) > 1 ?
                <Text style={{ backgroundColor: 'green' }}>true</Text> :
                <Text style={{ backgroundColor: 'red' }}>false</Text>}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
                    <Text>{subscription ? 'On' : 'Off'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
                    <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast} style={styles.button}>
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function round(n) {
    if (!n) {
        return 0;
    }
    return Math.floor(n * 10) / 10;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    text: {
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
    },
    middleButton: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
});