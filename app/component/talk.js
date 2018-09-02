import React,{Component} from 'react';
import {} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat'
export default class Chat extends Component{
    state = {
      messages: [],
    }
  

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: '你好',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }
  // componentDidMount() {
  //   var ws = new WebSocket('ws://192.168.20.231:3000/test');
  //   ws.onopen = function() {
  //     ws.send('hello');
  //   }
  //   var a;
  //   ws.onmessage = function(e){
  //     a = e.data;
  //   }
  //   this.setState()
  // }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}