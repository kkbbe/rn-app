import React,{Component} from 'react';
import {AsyncStorage,View, StyleSheet} from 'react-native';
import {Button,Toast} from 'antd-mobile-rn';

export default class Acount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: props.islogin
    }
    this.quit = this.quit.bind(this);
    this.login = this.login.bind(this);
    
  }
  componentWillReceiveProps(nextprops) {
    const zhuangtai = nextprops.islogin;
    this.setState({
      islogin: zhuangtai
    })
  }
  quit() {
    AsyncStorage.multiSet([['islogin','false'],['username','']]);
    this.props.tranIslogin(false);
    this.setState({islogin:false});
    
  }
  login() { 
    if(this.state.islogin === true) {
      Toast.info('已登录',1);
    } else {
      // this.refs.toast.show('false',1000);
      this.props.navigation.navigate('Login');
    }
   
  }
  
  render() {
    return(
      <View style={{flex:1,justifyContent: 'center',
      alignItems: 'center',}}>
        <Button
          style={styles.button}
          onClick={this.login}
          type="primary">
      登录
      </Button>
      
      <Button
        style={styles.button}
        type="primary"
        onClick={this.quit}>
        退出登录
      </Button>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  button:{
    width:120,
    height:50,
    marginTop:10
  }
})