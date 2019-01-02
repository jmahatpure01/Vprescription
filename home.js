import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import { Button, Card, Icon, ThemeContext, getTheme } from 'react-native-material-ui';
const uiTheme = {
    palette: {
      primaryColor: '#F72B2B',
      accentColor: '#60DAFF'
    },
  };
import Voice from 'react-native-voice';
import Config from './Config';

export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
      ended: '',
      result: ''
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

  componentDidMount() {
    this.requestMicPermission();
  }

componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  };
  onSpeechEnd(e) {
    this.setState({
      ended: '√'
    })
  };
onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  };
onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
    this.processResults(e.value);
  }
async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
    });
    try {
      await Voice.start('en-IN');
    } catch (e) {
      console.error(e);
    }
  }

  async _stopRecognition(e) {
    try {
      Voice.stop();
      this.setState({
        started: ''
      });
    } catch (e) {
      console.error(e);
    }
  }


  async requestMicPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          'title': 'Voice Prescription App Audio Permission',
          'message': 'Voice Prescription App needs to record audio ' +
                     'for prescriptions.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can record audio now")
      } else {
        console.log("Audio permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async processResults(data) {
    const response = await fetch(Config.SERVER_URL, {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    Config.DEBUG?console.log(response):"";
    const json = await response.json();
    this.setState({result: json, started: ''});
  }

render () {
    return (
        <ThemeContext.Provider value={getTheme(uiTheme)}>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <View style={styles.cardContainer}>
                        <Text style={styles.heading}>
                            Prescription
                        </Text>
                        <Text style={styles.transcript}> {this.state.result}</Text>
                        
                        {this.state.started?<Text style={styles.transcript}>Listening...</Text>:<View></View>}
                        <View style={styles.buttonsContainer}>
                          <Button raised primary onPress={this._startRecognition.bind(this)}
                          icon="mic" iconSet="Feather"  text="Start" />
                          <Button raised accent onPress={this._stopRecognition.bind(this)}
                          icon="mic-off" iconSet="Feather"  text="Stop" />
                        </View>
                    </View>
                </Card>
            </View>
        </ThemeContext.Provider>
    );
  }
}
const styles = StyleSheet.create({
  transcript: {
    textAlign: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%'
  },
  cardContainer: {
    padding: 10,
  },
  card: {
    marginLeft: '5%',
    width: '90%'
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 55,
    marginTop: 20
  }
});
