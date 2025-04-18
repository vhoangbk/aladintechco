import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigation/MainNavigator'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const App = () =>  {
  return (
    <Provider store={store}>
          <MainNavigator/>
    </Provider>
  )
}

export default App
