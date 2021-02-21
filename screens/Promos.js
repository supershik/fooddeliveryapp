import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Animated,
    ScrollView
} from "react-native";
import Theme from "../Theme";
import {useTheme} from '@react-navigation/native';
import { useSelector } from "react-redux";
import ListingCard from '../component/ListingCard'
import PropertyCard from '../component/PropertyCard'
import LinearGradient from "react-native-linear-gradient"

const defaultFadeColors = ['rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 1)'];
const arryMap = [1]

class PromosScreen extends React.Component {
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

    headerLayout () {
        const { config } = this.props

        return (
            <View>
                <View style={{paddingTop: 10}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: config.language == 'en' ? 'left' : 'right' }}>
                        Favorites
                    </Text>
                </View>
                <View style={config.language == 'en' ? styles.searchContainer :  styles.searchContainer_rtl}>
                    <View style={{flex: 1, paddingHorizontal: 3}}>
                        <PropertyCard
                            img={Theme.sample5} 
                            title={'Fried Chiken'} 
                        />
                    </View>
                    <View style={{flex: 1, paddingHorizontal: 3}}>
                        <PropertyCard
                            img={Theme.sample6} 
                            title={'Cool'} 
                        />
                    </View>
                    <View style={{flex: 1, paddingHorizontal: 3}}>
                        <PropertyCard
                            img={Theme.sample7} 
                            title={'Pizza'} 
                        />
                    </View>
                </View>
            </View>
            
        )
    }

    render() {
        const { config } = this.props

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
                        {this.headerLayout()}

                        <View style={{paddingTop: 10}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: config.language == 'en' ? 'left' : 'right' }}>
                                Recommend
                            </Text>
                        </View>
                        {arryMap.map((_, i) => {
                            return (
                                <View key={i}>
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
                                        img={Theme.sample4} 
                                        title={'Order a Custom delivery'} 
                                        content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus orci lectus, molestie ut elit in'}
                                    />
                                    <ListingCard
                                        img={Theme.sample8} 
                                        title={'Order a Custom delivery'} 
                                        content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus orci lectus, molestie ut elit in'}
                                    />
                                    <ListingCard
                                        img={Theme.sample10} 
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
                
                </View>

            </Animated.View>
        );
    }
}

export default function(props) {
    const {colors} = useTheme();
    const config = useSelector((state) => state.config);
    return <PromosScreen {...props} colors={colors} config={config}/>;
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
        justifyContent: 'space-between'
    },
    searchContainer_rtl: {
        paddingHorizontal: 0, 
        marginTop: 5, 
        marginBottom: 10, 
        flexDirection: 'row-reverse',
        alignItems: "center", 
        justifyContent: 'space-between'
    }
});