import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontRegular } from "src/types/fontType";


const HomeScreen = () => {
    return (
        <View>
            <Text style={styles.text}>HOme</Text>
            <Text style={styles.text}>HOme</Text>
            <Text style={styles.text}>HOme</Text>
            <Text style={styles.text}>HOme</Text>
            <Text style={styles.text}>HOme</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text:{
        fontFamily : fontRegular
    }
})

export default HomeScreen;
