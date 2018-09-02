import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {} from 'antd-mobile-rn';

export default class Zan extends Component {
    constructor(props){
        super(props);
        this.state={
            iszan:false,
            ispinglun:false,
            pinglun:[]
        }
    }
    render(){
        return(
            <View style={{flexDirection:'row',position:'absolute',right:10,bottom:10}}>
                <TouchableOpacity onPress={this.setState({iszan:true})}><Text style={this.state.iszan? {color:'blue'}:{color:'black'}}>赞</Text></TouchableOpacity>
                <TouchableOpacity onpress={}><Text>评论</Text></TouchableOpacity>
            </View>
        )
    }
}