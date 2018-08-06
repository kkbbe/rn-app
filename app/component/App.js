/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Alert, Image,AsyncStorage } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
export default class Helloworld extends Component {
  constructor(props) {
    super(props);
    this.state={
      value:""
    }
    this.usercheck = this.usercheck.bind(this);
    this.passcheck = this.passcheck.bind(this);
    this.login = this.login.bind(this);
  }
  usercheck() {
    const user = this.state.user;
    const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (!reg.test(user)) {
      this.refs.toast.show("手机号格式不正确",1000);
    }
  }
  passcheck() {
    const password = this.state.password;
    const regex = /^((?=.*[A-Z])|(?=.*[a-z]))[a-zA-Z0-9]{8}$/;
    if (!regex.test(password)) {
      this.refs.toast.show("密码格式不正确",1000);
    }
  }
  login() {
    const user = this.state.user;
    const password = this.state.password;
    const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    const regex = /^((?=.*[A-Z])|(?=.*[a-z]))[a-zA-Z0-9]{8}$/;
    if(reg.test(user)&&regex.test(password)){
      var arruser = [
        {name:17098700534,password:'q1234567'}
      ]
      let datauser = {
        name: user,
        password: password
      };
      // mock('http://192.168.20.231:3000/post/api/query','post',function(options){
      //   let data = decodeURIComponent(options.body);
      //   let res = JSON.parse(data);
      //   let a = 1;
      //   if(arruser[0].name === res.name && arruser[0].password === res.password){
      //     return a;
      //   }
      // })
       fetch('http://192.168.20.231:3000/post/api/query', {
        method: 'POST',
        body: JSON.stringify(datauser),
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then((res)=> {
        return res.json();
      }).then((txt)=>{
        // this.refs.toast.show(txt,1000);
        if (txt === 1) {
            // this.refs.toast.show("登录成功",1000);
            this.props.navigation.navigate('Home',{islogined:true});
            AsyncStorage.multiSet([['islogin','true'],['username',user]]);
            // this.setState({
            //   islogin:true
            // })
            // this.props.navigation.goBack();
            // this.props.navigation.state.params.callback({islogined:true});
          } else {
            this.refs.toast.show("账户 或 密码错误",1000);
          }
      })
      .catch((err)=>{console.error(err)});
     
    } else {
      this.refs.toast.show("账户或密码错误",1000);
    }
     
    
  }
  render() {
    return (
      <View style={styles.view}>
        <Image
          style={styles.head}
          source={require('../img/1.jpg')}
        />
         <View style={styles.inputuser}><Image style={styles.ico}
          source={require('../img/user.png')}/>
        <TextInput
          style={styles.pass}
          onChangeText={(user) => this.setState({user})}
          onBlur={this.usercheck}
          value={this.state.user}
          placeholder="手机号:"
          underlineColorAndroid='transparent'
        /></View>
        <View style={styles.inputpass}><Image style={styles.ico}
          source={require('../img/lock.png')}/>
          <TextInput
         style={styles.pass}
          onChangeText={(password) => this.setState({password})}
          onBlur={this.passcheck}
          value={this.state.password}
          placeholder="密码:"
          secureTextEntry={true}
          underlineColorAndroid='transparent'>
        </TextInput></View>
        
        <TouchableHighlight 
          style={styles.button}
          underlayColor='#009ACD'
          onPress={this.login}>
          <Text style={styles.buttontext}>登录</Text>
        </TouchableHighlight>
        <Toast ref="toast"
               style={{backgroundColor:'gray'}}
               position='top'
               positionValue={200}
               opacity={0.6}
               textStyle={{color:'white'}}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  inputuser: {
    height: 60, 
    flexDirection:'row',
    width: 300,
    borderColor: 'lightgrey', 
    borderWidth: 0.5,
    borderTopLeftRadius:15,
    borderTopRightRadius:15
  },
  inputpass: {
    height: 60, 
    flexDirection:'row',
    width: 300,
    borderColor: 'lightgrey', 
    borderWidth: 0.5,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15
  },
  pass:{
    height: 60,
    width: 250,
    fontSize:20
  },
  button: {
    height:50,
    width:300,
    borderRadius:10,
    backgroundColor:'#00BFFF',
    bottom:-30,
    justifyContent: 'center',
    alignItems:'center'
  },
  buttontext: {
    fontSize:20,
    color:'white',
  },
  head: {
  width: 100,
  height: 100,
  borderRadius: 50, 
  top:-30,
  overflow: 'hidden'
  },
  ico: {
    width: 24,
    height: 24,
    overflow: 'hidden',
    top:18,
    left:4
  }
})
