import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    ScrollView,
} from "react-native"
import Theme from "../Theme"
import {useTheme} from '@react-navigation/native'
import { useSelector, useDispatch } from "react-redux"
import LinearGradient from "react-native-linear-gradient"
import RNRestart from "react-native-restart"

import ChatCard from "../component/ChatCard"
import { changeLanguage } from "../redux"

const defaultFadeColors = ['rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 1)']
const arryMap = [1,2,3,4]

class ChatScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        isFade: false,
        keyword: ''
    }

    offsetY = 0
    scrollY = new Animated.Value(0)

    getStartFade() {
        const shadowPosY = this.scrollY.interpolate({
            inputRange: [0, 80],
            outputRange: [-40, 0],
            extrapolate: 'clamp',
          });
        return (
            <Animated.View style={{position: 'absolute', top: shadowPosY, width: '100%', height: 40}}>
                <LinearGradient
                    start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                    style={{ width: '100%', height: 40 }}
                    colors={defaultFadeColors}
                    pointerEvents={'none'}
                />
            </Animated.View>
        )
    }

    onChangeKeyword (text) {
        this.setState({ keyword: text })
    }

    onChangeLanguage () {
        const { config } = this.props;

        if (config.language == 'ar')
            this.props.dispatch(changeLanguage('en'))
        else
            this.props.dispatch(changeLanguage('ar'))

        setTimeout(() => {
            RNRestart.Restart();
        }, 1000);
    }

    render() {
        const { config } = this.props;

        return (
            <Animated.View style={[styles.container]}>
                <View style={{flex: 1, marginBottom: 10}}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
                            {
                              useNativeDriver: false,
                              listener: (e) => {
                                this.offsetY = e.nativeEvent.contentOffset.y
                                if(this.offsetY <= 2 )
                                    this.setState({isFade: false})
                                else 
                                    this.setState({isFade: true})
                                }
                            }
                        )}
                    >
                        {arryMap.map((_, i) => {
                            return (
                                <View key={i}>
                                    <ChatCard
                                        img={Theme.sample3} 
                                        type={1}
                                        title={'Order a Custom delivery'} 
                                        content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus orci lectus, molestie ut elit in'}
                                    />
                                    <ChatCard
                                        img={Theme.sample3} 
                                        type={2}
                                        title={'Order a Custom delivery'} 
                                        content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus orci lectus, molestie ut elit in'}
                                    />
                                </View>
                            )}
                        )}
                        
                    </ScrollView>
                    <TouchableOpacity onPress={() => this.onChangeLanguage()} 
                            style={{backgroundColor: 'green', borderRadius: 12}}
                        >
                            <Text style={{ color: 'white', textAlign: config.language == 'en' ? 'center': 'center', fontSize: 16, padding: 10}}> {config.language == 'ar' ?  'LTR Setting' : 'RTL Setting'} </Text>
                        </TouchableOpacity>
                    {this.state.isFade && this.getStartFade()}
                </View>

            </Animated.View>
        );
    }
}

export default function(props) {
    const {colors} = useTheme()
    const config = useSelector((state) => state.config)
    const dispatch = useDispatch()
    return <ChatScreen {...props} colors={colors} config={config} dispatch={dispatch}/>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    inputWrapper: {
        flex: 1,
        backgroundColor: Theme.white,
        width: "100%",
        borderRadius: 50,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        borderColor: 'grey',
        borderWidth: 0.5,
        height: 40,
    },
    searchInput: {
        height: 40,
        width: "100%",
        paddingLeft: 10,
        fontSize: 15,
        paddingHorizontal: 4,
    },
    searchMan: {
        marginLeft: 20,
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: Theme.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchContainer: {
        paddingHorizontal: 0, 
        marginTop: 5, 
        marginBottom: 10, 
        flexDirection: 'row', 
        alignItems: "center", 
        justifyContent: 'center'
    }
});