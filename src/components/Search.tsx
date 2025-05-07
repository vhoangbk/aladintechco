import {Image, StyleSheet, TextInput, View} from 'react-native';
import { colorWhite } from 'src/assets/color';
import { imageResource } from 'src/assets/imageResource';

const Search = ({setValue,value}:any) => {
  return (
    <View style={styles.container}>
        <Image source={imageResource.searchicon} style={styles.image}/>
        <TextInput 
          style={{flex:1}} 
          placeholder={'Search'}
          onChangeText={setValue}
          value={value}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    height: 50,
    borderRadius: 20,
    flex: 1,
    margin: 7,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    elevation:8,
    backgroundColor:colorWhite,
    shadowColor: '#00000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image:{
    width:40,
    height:40,
  },
});

export default Search;
