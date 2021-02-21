import React, { Component } from "react"
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
} from "react-native"
import { useTheme } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"

const BORDER_RADIUS = 16
class ListingCard extends Component {
    render() {
        const { config } = this.props

        return (
            <View style={styles.container}>
                <ImageBackground source={this.props.img}
                    style={{ width: '100%', height: 200 }}
                    imageStyle={{ borderTopLeftRadius: BORDER_RADIUS, borderTopRightRadius: BORDER_RADIUS }}>
                </ImageBackground>
                <View style={styles.cardShadow}>
                    <View style={styles.cardContainer}>
                        <Text style={{textAlign: config.language == 'en' ? 'left' : 'right', paddingTop: 10, fontSize: 15, fontWeight: 'bold' }}>{this.props.title}</Text>
                        <Text style={{textAlign: config.language == 'en' ? 'left' : 'right', paddingTop: 5, fontSize: 14}}>{this.props.content}</Text>
                    </View>
                </View>
            </View >
        );
    }
}

export default function(props) {
    const {colors} = useTheme()
    const config = useSelector((state) => state.config);
    const dispatch = useDispatch()
    return <ListingCard {...props} colors={colors} config={config} dispatch={dispatch}/>
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
        borderBottomEndRadius: BORDER_RADIUS,
        borderBottomLeftRadius: BORDER_RADIUS,
        backgroundColor: 'transparent',
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.22,
        elevation: 3,
    },
    cardContainer: {
        paddingHorizontal: 15,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomEndRadius: BORDER_RADIUS,
        borderBottomLeftRadius: BORDER_RADIUS,
        borderColor: '#ddd',
        borderWidth: 0.5
    },
});