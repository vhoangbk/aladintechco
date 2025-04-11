import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { RootStackParamList } from "src/types/RootStackParamList"

type PersonScreenProps = NativeStackScreenProps<RootStackParamList,'PersonScreen'>

const PersonScreen = ({navigation}:PersonScreenProps) => {
    return(
        <SafeAreaView style={{flex:1}}>
            
            <View style={styles.container}>
                <Button title="Dang nhap" onPress={()=>navigation.navigate("LoginScreen")} />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default PersonScreen;