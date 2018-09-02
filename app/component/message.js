import React,{Component} from 'react';
import {ActivityIndicator,RefreshControl,ScrollView,Text,TouchableOpacity,Image, StyleSheet,View,FlatList} from 'react-native';

export default class Message extends Component{
  constructor(props){
    super(props);
    this.state={
      message:[],
      isRefreshing:false,
      isloading:true,
      showfoot:0
    }
    this.onfresh=this.onfresh.bind(this);
    this._renderItem=this._renderItem.bind(this);
    this.fetchdata=this.fetchdata.bind(this);
  }
  componentWillMount(){
    fetch("http://rap2api.taobao.org/app/mock/25109/message",{
      method: 'Get',
      headers: {
        'Content-type': 'charset=UTF-8'
      }
    }).then(function(res){
      return res.json();
    }).then((res)=>{
     this.setState( {message:res.message})
    })
  }
  onfresh(){
    fetch("http://rap2api.taobao.org/app/mock/25109/message",{
      method: 'Get',
      headers: {
        'Content-type': 'charset=UTF-8'
      }
    }).then(function(res){
      return res.json();
    }).then((res)=>{
     this.setState( {message:res.message})
    })
  }
  setvis(islooked){
    if(islooked === false){
      return styles.num;
    } else {
      return styles.nonum;
    }
  }
  fetchdata(){
    fetch("http://rap2api.taobao.org/app/mock/25109/message",{
      method: 'Get',
      headers: {
        'Content-type': 'charset=UTF-8'
      }
    }).then(function(res){
      return res.json();
    }).then((res)=>{
      var a=res.message.slice(10);
     this.setState( {message:this.state.message.concat(a),isloading:false,showfoot:0})
    })
  }
  renderData(){
    return (
      <FlatList refreshControl={
              <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onfresh}
            />}
        data={this.state.message}
        renderItem={this._renderItem}
        ListFooterComponent={this._renderFooter.bind(this)}
        onEndReached={this._onendreached.bind(this)}
        onEndReachedThreshold={0.1}
        keyExtractor={item=>(item.id+String(100*Math.random()))}
      />
    )
  }

  _renderItem({item}){
    return(
          <TouchableOpacity key={item.id} style={styles.message} onPress={()=>{this.props.navigate('Chat')}}>
          <Image source={{uri:item.header}} style={styles.headimg}/>
          <View style={styles.mespara}>
            <Text style={{color:'black',fontSize:16}}>{item.sender}</Text>
            <Text style={{width:250,height:20,overflow:'hidden'}} ellipsizeMode='tail' numberOfLines={1}>{item.para}</Text>
          </View>
          <View style={styles.flexend}>
            <Text>{item.time}</Text>
            <View style={this.setvis(item.islooked)}>
              <Text style={{color:'white',alignItems:'center',top:1}}>{item.menum}</Text>
            </View>
          </View>
          </TouchableOpacity>
        )
  }
  _renderFooter(){
    if(this.state.showfoot === 2) {
      return(
        <View>
          <ActivityIndicator/>
          <Text style={{alignSelf:'center'}}>正在加载</Text>
        </View>
      )
    }else if(this.state.showfoot ===0){
      return(
        <View>
          <Text></Text>
        </View>
      )
    }
  }
  _onendreached(){
    if(this.state.showfoot != 0){
      return ;
    }
    this.setState({showfoot:2});
    this.fetchdata();
  }
  render() {
    return this.renderData();
  //   return(
  //     <ScrollView refreshControl={
  //       <RefreshControl
  //       refreshing={this.state.isRefreshing}
  //       onRefresh={this.onfresh}
  //     />}>
  //     {this.state.message.map((message)=>{
  //       return(
  //         <TouchableOpacity key={message.id} style={styles.message} onPress={()=>{this.props.navigate('Chat')}}>
  //           <Image source={{uri:message.header}} style={styles.headimg}/>
   
          
  //         <View style={styles.mespara}>
  //           <Text style={{color:'black',fontSize:16}}>{message.sender}</Text>
  //           <Text style={{width:250,height:20,overflow:'hidden'}} ellipsizeMode='tail' numberOfLines={1}>{message.para}</Text>
  //         </View>
  //         <View style={styles.flexend}>
  //           <Text>{message.time}</Text>
  //           <View style={this.setvis(message.islooked)}>
  //             <Text style={{color:'white',alignItems:'center',top:1}}>{message.menum}</Text>
  //           </View>
  //         </View>
  //         </TouchableOpacity>
  //       )
  //     })}
  //     </ScrollView>
  // )
  
  }
}  

const styles=StyleSheet.create({
  message:{
    height:70,
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
  flexend:{
    
  }
})