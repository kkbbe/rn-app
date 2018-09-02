import React,{Component} from 'react';
import {View, Text} from 'react-native';

export default class News extends Component{
  constructor(props){
    super(props);
    this.state={
      newsid:props.navigation.state.params.newsid,
      news:[]
    }
  }
  componentWillMount(){
    this.setState({newsid:this.props.navigation.state.params.newsid});
      fetch("http://rap2api.taobao.org/app/mock/25109/news",{
        method: 'Get',
        headers: {
          'Content-type': 'charset=UTF-8'
        }
      }).then(function(res){
        return res.json();
      }).then((res)=>{
        const a=this.state.newsid;
        this.setState( {news:res.array[a-1]});
      })
    }
    render(){
      return(
        <View>
          <Text>{this.state.news.id}</Text>
          <Text>{this.state.news.biaoti}</Text>
          <Text>{this.state.news.para}</Text>
        </View>
      )
    }
  
}