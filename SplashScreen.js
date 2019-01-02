import React from "react";
import { StyleSheet, Dimensions, Image,ImageBackground,Text, View, TouchableWithoutFeedback, AsyncStorage, StatusBar} from 'react-native';
import logoImg from './images/logo.png';
import { Button, Card, Icon, ThemeContext, getTheme } from 'react-native-material-ui';
const uiTheme = {
    palette: {
      primaryColor: '#F72B2B',
      accentColor: '#60DAFF'
    },
    toolbar: {
      container: {
        height: 50,
      },
    },
  };

export default class SplashScreen extends React.Component {
   static navigationOptions = {
      title: 'Voice Prescription',
      header: null
    };
    timer;

    constructor(props){
      super(props);
    }

    componentDidMount() {
      timer = setTimeout(()=>{this.loginWithToken()}, 2000);
    }
    

    loginWithToken = async() => {
      clearTimeout(timer);
      const { navigate } = this.props.navigation;
      navigate('Home');
    }


    
  render() {
     const { navigate } = this.props.navigation;
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <View style={styles.canCon1}>
          <StatusBar hidden={true} />
          <View style={styles.stretch1}>
              <View style={styles.container} >
                <Image source={logoImg} style={styles.image} />
                <Text style={styles.text}>{"Voice Prescription".toUpperCase()}</Text>
              </View>
          </View>
        </View>
      </ThemeContext.Provider>
    );
  }
}
const window = Dimensions.get('window');
const styles = StyleSheet.create({
    canCon1: {
        flex: 1,
        alignSelf: 'stretch',
        flexWrap: 'wrap'
    },
    touch: {
         width: null,
        flex:1,
        alignSelf: 'stretch',
    },
    stretch1: {
        width: null,
        flex:1,
    },
      container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    color: '#000',
    fontSize: 25,
    backgroundColor: 'transparent',
    marginTop: 20,
  },
});
