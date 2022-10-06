import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, } from 'react-native';


export default function FaceTracker(props) {

    const { 
        faceWidths,
    
    } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.faceWidthText}>Faces: {faceWidths.length}</Text>

            <Text style={styles.faceWidthText}>Max: {Math.floor(faceWidths.reduce((val, accum) => {
                if (accum < val) {
                    return val;
                }
                else {
                    return accum;
                }
            }, 0))}</Text>

            <Text style={styles.faceWidthText}>Min: {Math.floor(faceWidths.reduce((val, accum) => {
                if (accum > val) {
                    return val;
                }
                else {
                    return accum;
                }
            }, faceWidths[0] ?? 0))}</Text>
        </View>)

}


const styles = StyleSheet.create({

    faceWidthText: {
        fontSize: 30,
        color: '#0000ff',
        position: 'relative',
    },
    container: {

    },
})