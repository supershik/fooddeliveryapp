import React, { Component } from "react"
import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";
import ProgressCircle from 'react-native-progress-circle-rtl'
import Theme from "../Theme"
import { useTheme } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"

const BORDER_RADIUS = 12
class ChatCard extends Component {
    
    render() {
        const { config } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.cardShadow}>
                    <View style={[config.language == 'en' ? styles.cardContainer : styles.cardContainer_rtl]}>
                        <View style={config.language == 'en' ? styles.textContainer : styles.textContainer_rtl}>
                            <Text style={{textAlign: config.language == 'en' ? 'left' : 'right', paddingTop: 10, fontSize: 15, fontWeight: 'bold', color: Theme.primaryExtraLight }}>{this.props.title}</Text>
                            <Text style={{textAlign: config.language == 'en' ? 'left' : 'right', paddingTop: 5, fontSize: 14}}>{this.props.content}</Text>
                        </View>
                        <View style={{width: 50, paddingTop: 15, alignItems: 'center'}}>
                            { this.props.type == 1 &&
                                <ProgressCircle
                                    percent={70}
                                    radius={24}
                                    borderWidth={4}
                                    color={Theme.primaryExtraLight}
                                    shadowColor="#fff"
                                    bgColor="#fff"
                                    >
                                    <Text style={{ fontSize: 20, fontWeight:'bold' }}>{'22'}</Text>
                                </ProgressCircle>
                            }
                            { this.props.type == 2 &&
                                <View>
                                    <View style={styles.circle}>
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={{textAlign: "center", color: 'white', fontSize: 12}}>
                                                1
                                            </Text>
                                        </View>
                                    </View>
                                    <Image source={Theme.chat} style={{width: 25, height: 25, resizeMode: 'contain', tintColor: Theme.primaryLight}}/>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </View >
        );
    }
}

// export default ChatCard;
export default function(props) {
    const {colors} = useTheme();
    const config = useSelector((state) => state.config);
    const dispatch = useDispatch()
    return <ChatCard {...props} colors={colors} config={config} dispatch={dispatch}/>;
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    image: {
        width: '100%',
        height: '20%'
    },
    cardShadow: {
        borderRadius: BORDER_RADIUS,
        backgroundColor: 'transparent',
        shadowColor: "#000",
        shadowOffset:{
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.22,
        elevation: 3,
    },
    cardContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderLeftColor: Theme.primaryLight,
        borderLeftWidth: BORDER_RADIUS,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderRadius: BORDER_RADIUS,
        borderRightColor: '#eee',
        borderRightWidth: 1,
    },
    cardContainer_rtl: {
        flexDirection: 'row-reverse',
        paddingHorizontal: 10,
        borderRightColor: Theme.primaryLight,
        borderRightWidth: BORDER_RADIUS,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderRadius: BORDER_RADIUS,
        borderLeftColor: '#eee',
        borderLeftWidth: 1,
    },
    circle: {
        zIndex: 1,
        position: 'absolute',
        top: -10,
        left: -10,
        width: 17,
        height: 17,
        borderRadius: 100,
        backgroundColor: Theme.redLight,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 0,
    },
    textContainer_rtl: {
        flex: 1,
        paddingRight: 10,
    }
});