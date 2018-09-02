import React,{Component} from 'react';
import { Text, ScrollView, View, StyleSheet, AsyncStorage} from 'react-native';
import { Button, TabBar, Toast} from 'antd-mobile-rn';
import First from './first';
import Acount from './login';
import Message from './message';
import Xueqiquan from './xuexiquan';
import List from './list';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin:false,
      selectTab:'firstTab'
    };
    this.tranIslogin=this.tranIslogin.bind(this);
  }
  static navigationOptions = {
    title: '灯塔家长',
    headerStyle:{elevation: 0},
    headerTitleStyle:{flex:1, textAlign: 'center'},
  };
  componentDidMount() {
    AsyncStorage.multiGet(['islogin','username'], (err,result)=> {
      if(result[0][1] === 'false') {
        this.setState({
          islogin:false
        })
      } else if(result[0][1] === 'true') {
        this.setState({
          islogin:true
        })
      }
    })
  }
  componentWillReceiveProps(nextprops) {
    if('params' in nextprops.navigation.state){
      const a = nextprops.navigation.state.params.islogined;
      if(a === true){
        this.setState({
          islogin: true
        })
        Toast.info('true',1);
      }else {
        Toast.info('false',1);
      }
    }
  }
  tranIslogin(is) {
    this.setState({
      islogin:is
    })
  }

  onChangeTab(tabName) {
    if(tabName !== 'firstTab') {
      if(this.state.islogin === false) {
        this.props.navigation.navigate('Login');
      }
    }
    this.setState({
      selectTab:tabName
    });
    
  }
  render() {
    
    return(
      <View style={{flex:1}}>
        <TabBar 
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="#ccc"
        >
          <TabBar.Item 
            title="首页"
            icon={require('../img/home.png')}
            selected={this.state.selectTab === 'firstTab'}
            onPress={() => this.onChangeTab('firstTab')}
            iconStyle={{ width: 22, height: 22 }}
          >
          <First navigate={this.props.navigation.navigate}/>
          </TabBar.Item>
          <TabBar.Item 
            title="消息"
            icon={require('../img/message.png')}
            selected={this.state.selectTab === 'secondTab'}
            onPress={() => this.onChangeTab('secondTab')}
            iconStyle={{ width: 22, height: 22 }}
          >
          <Message navigate={this.props.navigation.navigate}/>
          </TabBar.Item>
          <TabBar.Item 
            title="学习圈"
            icon={require('../img/quanzi.png')}
            selected={this.state.selectTab === 'thirdTab'}
            onPress={() => this.onChangeTab('thirdTab')}
            iconStyle={{ width: 22, height: 22 }}
          >
          <Xueqiquan navigate={this.props.navigation.navigate}/>
          </TabBar.Item>
          <TabBar.Item 
            title="通讯录"
            icon={require('../img/address.png')}
            selected={this.state.selectTab === 'forthTab'}
            onPress={() => this.onChangeTab('forthTab')}
            iconStyle={{ width: 22, height: 22 }}
          ><List/>
          </TabBar.Item>
          <TabBar.Item 
            title="我的"
            icon={require('../img/my.png')}
            selected={this.state.selectTab === 'loginTab'}
            onPress={() => this.onChangeTab('loginTab')}
            iconStyle={{ width: 22, height: 22 }}
          >
          <Acount navigation={this.props.navigation} islogin={this.state.islogin} tranIslogin={is=>this.tranIslogin(is)}/>
          </TabBar.Item>
        </TabBar>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1

  },
  
})