import React,{PureComponent,Component} from 'react';
import {Dimensions,StyleSheet,View,Text,SectionList,FlatList,ScrollView,ActivityIndicator} from 'react-native';
const {width,height} = Dimensions.get('window');
import makepy from './qushouzimu'
import addresslist from '../json/addresslist.json'
import moban from '../json/moban.json'
const statusHeight = 20;
const rowHeight = 44;
const separatorHeight = 1;
const headerHeight = 24;
const sesctionWidth = 20;
const sectionTopBottomHeight = 50;
const sectionItemHeight = (height - statusHeight - sectionTopBottomHeight * 2 -100) / 26;

const touchDownBGColor = '#999999';
const touchUpBGColor = 'transparent';



export default class List extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            datasource:[],
            refreshing:false,
            istouch:false,
            isloading:true,
            addresslist:[]
        }
        this.data=[];
        this.friendlist=[];
        this.addresslistsource=[];
        this.renderLoading=this.renderLoading.bind(this);
        this.getzm=this.getzm.bind(this);
        this.scrollsectionList=this.scrollsectionList.bind(this);
        this.responsegrant=this.responsegrant.bind(this);
        this.responsemove=this.responsemove.bind(this);
    }
    getzm(arr,arr1){
        var letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        for(var i=0;i<arr.length;i++){
            var a=String(makepy(arr[i].name));
            arr[i].letter=a[0];
        }
        
        arr.sort((a,b)=>{ return a.name.localeCompare(b.name)});
        arr.map((item)=> {
            letter.map((letterindex,i)=>{
                if(item.letter===letterindex){
                arr1[i].data.push(item);
            }
            })
        })
        return arr1;
    }
    
    renderLoading(){
        return(
            <View>
                 <ActivityIndicator/>
            </View>
           
        );
    }
    componentDidMount(){
        fetch('http://rap2api.taobao.org/app/mock/25109/tongxunlu',{
            method: 'Get',
            headers: {
              'Content-type': 'charset=UTF-8'
            }
        }).then(function(res){
            return res.json();
        }).then((res)=>{
            var arr1=moban.menu;
            var data = res.tongxunlu;
            this.getzm(data,arr1);
            
            this.setState({data:arr1,isloading:false});
            this.data = arr1;

        })
        
    }
    separatorComponent() {
        return <View style={styles.separatorstyle}/>
    }
    listfootcomponent(){
        return this.state.data.length !== 0 ?<View><Text></Text></View> : null;
    }
    listheadercomponent(){
        return this.state.data.length !== 0 ?<View><Text></Text></View> : null;
    }
    responsegrant(event) {
        this.scrollsectionList(event);
        this.setState({istouch:true});
    }
    responsemove(event) {
        this.scrollsectionList(event);
        this.setState({istouch:true});
    }
    responserelease(event){
        this.setState({istouch:false});
    }

    scrollsectionList(event){
        const touch = event.nativeEvent.touches[0];
        if(touch.pageY- statusHeight>= sectionTopBottomHeight && touch.pageY<=statusHeight+sectionTopBottomHeight+sectionItemHeight*this.data.length){
            const index =(touch.pageY-statusHeight-sectionTopBottomHeight)/sectionItemHeight

            this.refs.sectionList.scrollToLocation({animated: true, itemIndex: 0, sectionIndex: parseInt(index),viewOffset:110})
        }
    }

    sectionitemview() {
        const sectionitem = this.data.map((item,index)=>{
           return <Text style = {[styles.sectionItemStyle,{backgroundColor:this.state.istouch ? touchDownBGColor : touchUpBGColor}]}>{item.key}</Text>
        });
        return <View style={styles.sectionItemViewStyle}
                     ref='sectionitemview'
                     onStartShouldSetResponder={()=>true}
                     onMoveShouldSetResponder={()=>true}
                     onResponderGrant={this.responsegrant.bind(this)}
                     onResponderMove={this.responsemove.bind(this)}
                     onResponderRelease={this.responserelease.bind(this)}
            >
        {sectionitem}
        </View>
    }
    _renderiten(info){
        return(
            <Text style={{fontSize:18}}>{info.item.name}</Text>
        )
    }
    itemlayout() {
        return {length: rowHeight, offset: (rowHeight + separatorHeight) * index + headerHeight, index};
    }
    render(){
        if(this.state.isloading===false){
            return(
                <View>
            <SectionList
                ref='sectionList'
                renderItem={this._renderiten.bind(this)}
                renderSectionHeader={({section:{key}})=>(
                    <View style={{backgroundColor:'#F0F0F0'}}>
                        <Text style={{ fontWeight: "bold" ,fontSize:16,color:'black'}}>{key}</Text>
                    </View>
                    
                )}
                ItemSeparatorComponent={this.separatorComponent.bind(this)}
                ListFooterComponent={this.listfootcomponent.bind(this)}
                ListHeaderComponent={this.listheadercomponent.bind(this)}
                sections={this.state.data}
            />
            {this.sectionitemview()}
            </View>
            );
        }else 
        if(this.state.isloading===true) {
            return this.renderLoading();
        }
        
    return(
        <View>
            <Text></Text>
        </View>
    )
       
        
    }
}
const styles=StyleSheet.create({
    sectionItemViewStyle:{
        position: 'absolute',
        width: sesctionWidth,
        height: height - statusHeight,
        right: 0,
        top: 0,
        paddingTop: sectionTopBottomHeight,
        paddingBottom: sectionTopBottomHeight,
    },
    separatorstyle:{
        height:separatorHeight,
        backgroundColor:'#F0F0F0'
    },
    sectionItemStyle:{
        textAlign: 'center',
        alignItems: 'center',
        height: sectionItemHeight,
        lineHeight: sectionItemHeight
    },
})