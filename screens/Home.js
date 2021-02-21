import React from "react";
import {
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Animated,
    ScrollView,
    Text
} from "react-native";
import Theme from "../Theme";
import {useTheme} from '@react-navigation/native';
import { useSelector } from "react-redux";
import ListingCard from '../component/ListingCard'
import LinearGradient from "react-native-linear-gradient"

const defaultFadeColors = ['rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 1)'];
const arryMap = [1]
const {width, height} = Dimensions.get('screen');

class HomeScreen extends React.Component {
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

    searchLayout () {
        const { config } = this.props;

        return (
            <View style={config.language == 'en' ? styles.searchContainer : styles.searchContainer_rtl}>
                <View style={config.language == 'en' ? styles.inputWrapper : styles.inputWrapper_rtl}>
                    <TouchableOpacity
                        onPress={() => alert('pressed!')}
                    >
                    <Image
                        source={Theme.search}
                        style={{ height: 20, width: 20, resizeMode: "contain" }}
                    />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: "center" }}>
                    <TextInput
                        style={config.language == 'en' ? styles.searchInput : styles.searchInput_rtl}
                        placeholder={'Hungry?'}
                        placeholderTextColor={'#bbb'}
                        value={this.state.keyword}
                        maxLength={20}
                        onChangeText={(text) => this.onChangeKeyword(text)}
                    />
                    </View>
                </View>
                <TouchableOpacity style={[styles.searchMan, {marginLeft: config.language == 'en' ? 15 : 0, marginRight: config.language == 'en' ? 0 : 15}]}>
                    <Image source={Theme.man} style={{width: 22, height: 22, resizeMode: 'contain'}}/>
                </TouchableOpacity>
            </View>
        )
    }

    toolbarLayout () {
        const { config } = this.props;

        return (
            <View style={styles.toolbarContainer}>
                <View style={styles.toolbarWrapper}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <View style={styles.toolbarbanner}/>
                    </View>
                    
                    <View style={{ flexDirection : config.language == 'en' ? 'row' : 'row-reverse', justifyContent: 'space-evenly', marginTop: 10}}>
                        <View style={styles.toolbarContent}>
                            <TouchableOpacity style={[styles.toolbarIconBackground, {backgroundColor: '#00AED6'}]}>
                                <Image
                                    source={Theme.med}
                                    style={styles.toolbarIcon}
                                />
                            </TouchableOpacity>
                            <Text style={styles.toolbarText}>
                                Med
                            </Text>
                        </View>
                        <View style={styles.toolbarContent}>
                            <TouchableOpacity style={[styles.toolbarIconBackground, {backgroundColor: '#00AA13'}]}>
                                <Image
                                    source={Theme.coffee}
                                    style={styles.toolbarIcon}
                                />
                            </TouchableOpacity>
                            <Text style={styles.toolbarText}>
                                Coffee
                            </Text>
                        </View>
                        <View style={styles.toolbarContent}>
                            <TouchableOpacity style={[styles.toolbarIconBackground, {backgroundColor: '#F06400'}]}>
                                <Image
                                    source={Theme.food}
                                    style={styles.toolbarIcon}
                                />
                            </TouchableOpacity>
                            <Text style={styles.toolbarText}>
                                Food
                            </Text>
                        </View>
                        <View style={styles.toolbarContent}>
                            <TouchableOpacity style={[styles.toolbarIconBackground, {backgroundColor: '#ED2736'}]}>
                                <Image
                                    source={Theme.market}
                                    style={styles.toolbarIcon}
                                />
                            </TouchableOpacity>
                            <Text style={styles.toolbarText}>
                                Market
                            </Text>
                        </View>
                    </View>
                </View>

            </View>
        )
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
                        {this.searchLayout()}

                        {arryMap.map((_, i) => {
                            return (
                                <View key={i}>
                                    <ListingCard
                                        img={Theme.sample4} 
                                        title={'Order a Custom delivery'} 
                                        content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus orci lectus, molestie ut elit in'}
                                    />
                                    <ListingCard
                                        img={Theme.sample3} 
                                        title={'Order a Custom delivery'} 
                                        content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus orci lectus, molestie ut elit in'}
                                    />
                                    <ListingCard
                                        img={Theme.sample2} 
                                        title={'Order a Custom delivery'} 
                                        content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus orci lectus, molestie ut elit in'}
                                    />
                                    <ListingCard
                                        img={Theme.sample10} 
                                        title={'Order a Custom delivery'} 
                                        content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus orci lectus, molestie ut elit in'}
                                    />
                                    <ListingCard
                                        img={Theme.sample8} 
                                        title={'Order a Custom delivery'} 
                                        content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus orci lectus, molestie ut elit in'}
                                    />
                                    <ListingCard
                                        img={Theme.sample5} 
                                        title={'Order a Custom delivery'} 
                                        content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus orci lectus, molestie ut elit in'}
                                    />
                                </View>
                            )}
                        )}
                    </ScrollView>

                    {this.state.isFade && this.getStartFade()}

                    {this.toolbarLayout()}

                </View>

            </Animated.View>
        );
    }
}

export default function(props) {
    const {colors} = useTheme()
    const config = useSelector((state) => state.config)
    return <HomeScreen {...props} colors={colors} config={config}/>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    inputWrapper: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: Theme.white,
        width: "100%",
        borderRadius: 50,
        paddingHorizontal: 10,
        alignItems: "center",
        alignSelf: "center",
        borderColor: '#eee',
        borderWidth: 1,
        height: 40,
    },
    inputWrapper_rtl: {
        flex: 1,
        flexDirection: "row-reverse",
        backgroundColor: Theme.white,
        width: "100%",
        borderRadius: 50,
        paddingHorizontal: 10,
        alignItems: "center",
        alignSelf: "center",
        borderColor: '#eee',
        borderWidth: 1,
        height: 40,
    },
    searchInput: {
        height: 40,
        width: "100%",
        paddingLeft: 10,
        fontSize: 15,
        paddingHorizontal: 4,
        textAlign: 'left',
    },
    searchInput_rtl: {
        height: 40,
        width: "100%",
        paddingRight: 10,
        fontSize: 15,
        paddingHorizontal: 4,
        textAlign: 'right',
    },
    searchMan: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: Theme.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchMan_rtl: {
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
    },
    searchContainer_rtl: {
        paddingHorizontal: 0, 
        marginTop: 5, 
        marginBottom: 10, 
        flexDirection: 'row-reverse', 
        alignItems: "center", 
        justifyContent: 'center'
    },
    toolbarContainer: {
        position: 'absolute',
        bottom: 30,
        width: width-40,
        shadowColor: "#000",
        shadowOffset:{
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.9,
        shadowRadius: 2.22,
        elevation: 5,
    },
    toolbarWrapper: {
        backgroundColor: 'white',
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset:{
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.9,
        shadowRadius: 2.22,
        elevation: 5,
    },
    toolbarbanner: {
        marginTop: 8,
        height: 5,
        width: 40,
        borderRadius: 100,
        backgroundColor: '#ccc',
    },
    toolbarIconBackground: {
        width: 45,
        height: 45,
        borderRadius: 100,
        backgroundColor: Theme.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    toolbarIcon: {
        height: 28, 
        width: 28, 
        resizeMode: "contain", 
        tintColor: 'white' 
    },
    toolbarText: {
        color: 'black',
        fontSize: 12,
        paddingVertical: 5
    },
    toolbarContent: {
        alignItems: 'center'
    }
});