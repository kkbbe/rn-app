import React,{Component} from 'react';
import {ScrollView,Text,TouchableOpacity,RefreshControl,StyleSheet,Image,View} from 'react-native';
import {Button } from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons/Ionicons'
import ActionButton from 'react-native-action-button';
export default class Xuexiquan extends Component{
  constructor(props){
    super(props);
    this.state={
      tiezis:[],
      isRefreshing:false,
      
    }
    this.onfresh=this.onfresh.bind(this);
   
  }
  componentDidMount(){
    fetch("http://rap2api.taobao.org/app/mock/25109/bbs",{
      method: 'Get',
      headers: {
        'Content-type': 'charset=UTF-8'
      }
    }).then(function(res){
      return res.json();
    }).then((res)=>{
     this.setState({tiezis:res.tiezis})
    })
  }
  onfresh(){
    fetch("http://rap2api.taobao.org/app/mock/25109/bbs",{
      method: 'Get',
      headers: {
        'Content-type': 'charset=UTF-8'
      }
    }).then(function(res){
      return res.json();
    }).then((res)=>{
     this.setState({tiezis:res.tiezis})
    })
  }
  
  render(){
    return(
      <View>
      <ScrollView refreshControl={
        <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this.onfresh}
      />}>
      
      {this.state.tiezis.map((tiezi)=>{
        return (
          <View style={{flexDirection:'column'}}>
            <View key={tiezi.id} style={styles.message} >
              <Image source={{uri:tiezi.headimg}} style={styles.headimg}/>
              <View style={styles.mespara}>
                <Text style={{color:'black',fontSize:16}}>{tiezi.user}</Text>
                <Text style={{width:250,overflow:'hidden'}}>{tiezi.neirong}</Text>
                <Text>{tiezi.date}</Text>
              </View>
              <View style={{flexDirection:'row',position:'absolute',right:10,bottom:10}}>
                <TouchableOpacity onPress={}><Text>赞</Text></TouchableOpacity>
                <TouchableOpacity onpress={}><Text>评论</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        )
      })}
       
      </ScrollView>
      <ActionButton 
        buttonColor="rgba(231,76,60,1)"
        onPress={() => {this.props.navigate('Newtie')}}
        offsetY={70}
      />
          
    
      </View>
    )
  }

}
const styles=StyleSheet.create({
  message:{
    height:120,
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderColor: '#E5E5E5',
    justifyContent:'space-around'
  },
  mespara:{
    alignSelf: 'center',
    width:260
  },
  headimg:{
    width:50,
    height:50,
    alignSelf:'center',
    borderRadius:25,
    overflow:'hidden',
    marginLeft:10
  },
  num:{
    height:22,
    width:22,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor:'#FF4040',
    borderRadius: 50,
    top:5
  },
  nonum:{

  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})