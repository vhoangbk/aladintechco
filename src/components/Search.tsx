import {Image, StyleSheet, TextInput, View} from 'react-native';
import { imageResource } from 'src/assets/imageResource';

const Search = () => {
  return (
    <View style={styles.container}>
        <Image source={imageResource.searchicon} style={styles.image}/>
        <TextInput style={{flex:1}} placeholder={'Search'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 50,
    borderRadius: 20,
    flex: 1,
    margin: 7,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
  },
  image:{
    width:40,
    height:40,
  },
});

export default Search;
