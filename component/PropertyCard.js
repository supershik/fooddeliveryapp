import React, { Component } from "react"
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
} from "react-native"
import { useTheme } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"

const BORDER_RADIUS = 6
class PropertyCard extends Component {
    render() {
        const { config } = this.props

        return (
            <View style={styles.container}>
                <ImageBackground source={this.props.img}
                    style={{ width: '100%', height: 100 }}
                    imageStyle={{ borderTopLeftRadius: BORDER_RADIUS, borderTopRightRadius: BORDER_RADIUS }}>
                </ImageBackground>
                <View style={styles.cardShadow}>
                    <View style={styles.cardContainer}>
                        <Text style={{textAlign: config.language == 'en' ? 'center' : 'center', paddingVertical: 3, fontSize: 14, fontWeight: 'bold' }}>{this.props.title}</Text>
                    </View>
                </View>
            </View >
        );
    }
}

export default function(props) {
    const {colors} = useTheme();
    const config = useSelector((state) => state.config);
    const dispatch = useDispatch()
    return <PropertyCard {...props} colors={colors} config={config} dispatch={dispatch}/>;
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 1,
    },
    image: {
        width: '100%',
        height: '20%'
    },
    cardShadow: {
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
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 0.5
    },
});