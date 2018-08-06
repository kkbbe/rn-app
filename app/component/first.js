import React,{ Component } from 'react';
import { ScrollView, Text, View, StyleSheet,Image, TouchableOpacity } from 'react-native';
import { Carousel } from 'antd-mobile-rn';
import News from './firstnews';

export default class First extends Component {
  constructor(props){
    super(props);
    this.state={
      news:[]
    }
    
  }
  componentWillMount(){
    fetch("http://rap2api.taobao.org/app/mock/25109/news",{
      method: 'Get',
      headers: {
        'Content-type': 'charset=UTF-8'
      }
    }).then(function(res){
      return res.json();
    }).then((res)=>{
     this.setState( {news:res.array})
    })
  }
  render(){
    const show = this.state.news;
    return(
      <ScrollView style={{flex:1,backgroundColor:'#F0F0F0'}}>
        <Carousel
          infinite
          autoplay
        >
         <Image
          style={styles.swiper}
          source={require('../img/1.jpg')}
        />
        <Image
          style={styles.swiper}
          source={require('../img/1.jpg')}
        />
        <Image
          style={styles.swiper}
          source={require('../img/1.jpg')}
        />
        </Carousel>
        <View style={styles.buttonsview}>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/announcement.png')} 
            >
            </Image>
            <Text>通知公告</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/announcement.png')} 
            >
            </Image>
            <Text>通知公告</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/announcement.png')} 
            >
            </Image>
            <Text>通知公告</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/announcement.png')} 
            >
            </Image>
            <Text>通知公告</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/announcement.png')} 
            >
            </Image>
            <Text>通知公告</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/announcement.png')} 
            >
            </Image>
            <Text>通知公告</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/announcement.png')} 
            >
            </Image>
            <Text>通知公告</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/announcement.png')} 
            >
            </Image>
            <Text>通知公告</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor:'white'}}>

        {this.state.news.map((news)=>{
          return(
            <TouchableOpacity key={news.id}>
               <Image source={{uri:news.pic}} style={{width:100,height:100}}/>
              <Text>{news.biaoti}</Text>
              <Text>{news.para}</Text>
              <Text>{news.date}</Text>
              <Text>{news.view}</Text>
            </TouchableOpacity>
          )
        })}
        </View>
      </ScrollView>
    )
  }
}
const styles=StyleSheet.create({
  swiper: {
    height:150
  },
  buttonsview: {
    height: 200,
    borderWidth:1,
    flexDirection: 'row',
    flexWrap: "wrap",
    borderColor:'#F2F2F2',
    marginTop:10,
    marginBottom:10,
    backgroundColor:'white'
  },
  button: {
    width:89,
    height:100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width:65,
    height:65
  }
})