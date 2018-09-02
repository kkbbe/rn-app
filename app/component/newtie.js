import React,{Component} from 'react';
import {View,TouchableOpacity,Text,StyleSheet,PermissionsAndroid,ToastAndroid,AsyncStorage} from 'react-native';
import {TextareaItem,Button,Toast} from 'antd-mobile-rn';
import ImagePicker from 'react-native-image-picker';

export default class Newtie extends Component{
    constructor(props){
        super(props);
        this.state={
            username:AsyncStorage.getItem('username'),
            avatarSource:null,
            text:''
        }
    }

  static navigationOptions = {
      Title:'发帖',
    //   headerRight:(
    //       <Button
    //         onPress={()=>{
    //             const content=navigation.getParam('content');
    //             const name=navigation.getParam('name');
    //             var date=new Date;
    //             ToastAndroid.show(content);
    //         }} 
    //       ><Text>发表</Text></Button>
    //   )
  }
//   componentDidMount(){
//       this.props.navigation.setParams({'content':this.state.text,'name':this.state.username})
//   }
  gettie=()=>{
      this.setState()
  }
  show(data){
      ToastAndroid.show(data,ToastAndroid.SHORT);
  }
  selectPhotoTapped() {
    const options = {
        title: '选择图片', 
        cancelButtonTitle: '取消',
        takePhotoButtonTitle: '拍照', 
        chooseFromLibraryButtonTitle: '选择照片', 
        cameraType: 'back',
        mediaType: 'photo',
        videoQuality: 'high', 
        durationLimit: 10, 
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.8, 
        angle: 0,
        allowsEditing: false, 
        noData: false,
        storageOptions: {
            skipBackup: true  
        }
    };

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled photo picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };
            this.setState({
                avatarSource: source
            });
        }
    });
    
}
fabiao=()=>{
    const name=this.state.username;
    const text=this.state.text;
    const date=new Date;
    let data={
        name:name,
        text:text,
        date:date
    }
    Toast.show(text);
    fetch('http://127.0.0.1:3000/bbs/new',{
        method: 'POST',
        body:data,
        headers: {
            'Content-type': 'charset=UTF-8'
        }
    }).then((res)=>{
        res.json();
    }).then((txt)=>{
        if(txt.isfabiao===true){
            this.props.navigation.navigate('Home');
        }
    });
    
}
  render(){
      return(
        <View style={{flex:1,flexDirection:'column'}}>
                <TextareaItem rows={6} count={300} 
                value={this.state.text}
                onChangeText={(text)=>{this.setState({text:text})}}
                />

            <TouchableOpacity style={[styles.avatar,styles.avatarContainer]} onPress={this.selectPhotoTapped.bind(this)}>
            <View >
                <Text>选择图片</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:'center',alignItems:'center',height:50,backgroundColor:'lightblue',width:350}} onPress={this.fabiao}>
                <Text>发表</Text>
            </TouchableOpacity>
        </View>
      )
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 ,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    avatar: {
        margin:10,
        width: 80,
        height: 80,
        borderRadius:5
    }

});
