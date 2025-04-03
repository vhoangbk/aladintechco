import React from "react";
import { StyleSheet, Text, View } from "react-native";


// App chính
const HomeScreen = () => {
    return (
        <View>
            <Text style={styles.text}>HOme</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text:{
        fontFamily:'P'
    }
})

export default HomeScreen;
