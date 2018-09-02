import React,{ Component } from 'react';
import { ScrollView, Text, View, StyleSheet,Image, TouchableOpacity } from 'react-native';
import { Carousel } from 'antd-mobile-rn';

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
            <Text style={{color:'black'}}>通知公告</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/student.png')} 
            >
            </Image>
            <Text style={{color:'black'}}>今日课堂</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/pen.png')} 
            >
            </Image>
            <Text style={{color:'black'}}>家庭作业</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/zoom.png')} 
            >
            </Image>
            <Text style={{color:'black'}}>成绩查询</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/stat.png')} 
            >
            </Image>
            <Text style={{color:'black'}}>课堂表现</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/reward.png')} 
            >
            </Image>
            <Text style={{color:'black'}}>成长记录</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/people.png')} 
            >
            </Image>
            <Text style={{color:'black'}}>家长圈子</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
            style={styles.image}
            source={require('../img/addition.png')} 
            >
            </Image>
            <Text style={{color:'black'}}>更多</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor:'white'}}>
        <View style={{justifyContent:'center',height:30,borderBottomColor:'#F2F2F2',borderBottomWidth:1}}>
          <Text style={{fontSize:18,left:15,color:'black',fontWeight:'bold'}}>教育资讯</Text>
        </View>
        {this.state.news.map((news)=>{
          return(
            <TouchableOpacity key={news.id} style={{flex:1,flexDirection:'row',marginTop:10,height:100,borderBottomWidth:0.7,borderColor:'#E5E5E5'}} onPress={()=>{this.props.navigate('News',{newsid:news.id})}}>
              <Image source={{uri:news.pic}} style={{width:80,height:80,alignSelf:'center',marginLeft:10}}/>
              <View style={{flex:1,alignSelf:'center',marginLeft:10}}>
                <Text style={{color:'black'}}>{news.biaoti}</Text>
                <Text  ellipsizeMode='tail' numberOfLines={3}>{news.para}</Text>
                <View style={{flexDirection:'row'}}>
                  <Text>{news.date+'        '}</Text>
                  <Text>{news.view}</Text>
                </View>
              </View>
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
    justifyContent:'space-around',
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