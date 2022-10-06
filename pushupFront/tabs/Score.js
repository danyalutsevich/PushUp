import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';

export default function Score(props) {

    const [globalScore, setGlobalScore] = useState([]);
    const [friendsScore, setFriendsScore] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [activeTab, setActiveTab] = useState('global');

    const getGlobalScore = () => {
        setRefreshing(true)
        fetch('http://pushup.ddns.net:8008/score/global')
            .then(res => res.json())
            .then(data => { setGlobalScore(data) })
            .then(() => { setRefreshing(false) })
            .catch(err => { alert('Score update failed\nCheck your internet connection') })
    }

    const getFriendsScore = () => {
        setRefreshing(true)
        fetch(`http://pushup.ddns.net:8008/score/${props.route.params.username}`)
            .then(res => res.json())
            .then(data => { setFriendsScore(data) })
            .then(() => { setRefreshing(false) })
            .catch(err => { alert('Score update failed\nCheck your internet connection') })
    }

    const getScoreElements = (data) => {

        const res = data.map((item, index) => {
            return (
                <View style={styles.Score} key={index}>
                    <Text style={styles.ScoreNumber} numberOfLines={1} adjustsFontSizeToFit={true}>{index + 1 + "."}</Text>
                    <Text style={styles.ScoreUsername} numberOfLines={1} adjustsFontSizeToFit={true}>{item.Username}</Text>
                    <Text style={styles.ScorePoint} numberOfLines={1} adjustsFontSizeToFit={true}>{item.sum}</Text>
                    <Text style={styles.ScorePoint} numberOfLines={1} adjustsFontSizeToFit={true}>{Math.floor(item.avg)}</Text>
                </View>

            )
        })

        if (res.length == 0) {
            return (
                <Text style={styles.ButtonText}>Loading...</Text>
            )
        }
        else {
            return res
        }

    }

    useEffect(() => {

        getGlobalScore();
        getFriendsScore();
    }, []);

    return (
        <View>
            <ScrollView style={styles.ScrollViewStyle}
                refreshControl={<RefreshControl refreshing={refreshing}
                    onRefresh={() => { activeTab == 'global' ? getGlobalScore() : getFriendsScore() }} />}
                stickyHeaderHiddenOnScroll={true}
                stickyHeaderIndices={[0]}
                centerContent={true}
                
            >
                <View>
                    <View style={[styles.Score, styles.Header]}>
                        <Text style={styles.ScoreNumber}>#.</Text>
                        <Text style={styles.ScoreUsername} numberOfLines={1} adjustsFontSizeToFit={true}>Username</Text>
                        <Text style={styles.ScorePoint}>SUM</Text>
                        <Text style={styles.ScorePoint}>AVG</Text>
                    </View>
                    <View style={[styles.ScoreHeaderButtons, styles.Header]}>
                        <TouchableOpacity
                            style={activeTab == 'friends' ? styles.ActiveButton : styles.InactiveButton}
                            onPress={() => { setActiveTab('friends') }}
                        >
                            <Text style={styles.ButtonText}>friends</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={activeTab == 'global' ? styles.ActiveButton : styles.InactiveButton}
                            onPress={() => { setActiveTab('global') }}
                        >
                            <Text style={styles.ButtonText} >global</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    activeTab == 'global' ? getScoreElements(globalScore) : getScoreElements(friendsScore)
                }
            </ScrollView>
        </View>
    )


}

const styles = StyleSheet.create({
    Score: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    Header: {
        backgroundColor: '#D9D9D9',
    },

    ScoreHeaderButtons: {
        backgroundColor: '#fdf',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 50,
    },

    ActiveButton: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        borderBottomWidth: 2,
    },
    InactiveButton: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    ButtonText: {
        fontFamily: 'MonumentRegular',
        fontSize: 17,
    },
    ScoreNumber: {
        width: '10%',
        fontFamily: 'MonumentRegular',
        fontSize: 20,
        textAlign: 'center',
    },
    ScoreUsername: {
        width: '50%',
        textAlign: 'center',
        fontFamily: 'MonumentRegular',
        fontSize: 20,
    },
    ScorePoint: {
        width: '20%',
        textAlign: 'center',
        fontFamily: 'MonumentRegular',
        fontSize: 20,
    },
    ScrollViewStyle: {
        // borderWidth: 10,
        borderColor: '#8fcbbc',
        backgroundColor: '#E8E8E8',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
})

