import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar
} from "react-native";
import Theme from "../Theme"
import { useSelector } from "react-redux"
import HomeScreen from './Home'
import ChatScreen from './Chat'
import PromosScreen from './Promos'

const {width, height} = Dimensions.get('screen')

const tabscreen = {
  Promos:
    Theme.promos,
  Home:
    Theme.home,
  Chat:
    Theme.chat,
};

const data = Object.keys(tabscreen).map((i) => ({
  key: i,
  title: i,
  image: tabscreen[i],
  ref: React.createRef()
}));

const data2 = Object.keys(tabscreen).map((i) => ({
  key: i,
  title: i,
  image: tabscreen[i],
  ref: React.createRef()
}));

const data_reverse = data2.reverse()

const Tab = React.forwardRef(({item, onItemPress, selected}, ref) => {
  const config = useSelector((state) => state.config);

  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref} style={{flexDirection : config.language == 'en' ? 'row' : 'row-reverse', justifyContent: 'space-evenly', alignItems: "center"}}>
        <View>
          {item.title === 'Chat' &&
            <View style={config.language == 'en' ? styles.circle : styles.circle_rtl }>
              <View style={{alignItems: 'center'}}>
                <Text style={{textAlign: "center", color: 'white', fontSize: 12}}>
                  1
                </Text>
              </View>
            </View>
          }
          <Image
              source={item.image}
              style={{width: 20, height: 20, resizeMode: 'cover', tintColor: selected ? 'white': Theme.primary}}
            />
        </View>
          <Animated.Text style={[config.language == 'en' ? styles.tabText : styles.tabText_rtl, {color: selected ? 'white': Theme.primary} ]}>
            {item.title}
          </Animated.Text>
      </View>
    </TouchableOpacity>
  )
});

const Indicator = ({measures, scrollX}) => {
  const paddingHoz = 15
  const inputRange = data.map((_, i) => i*width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width+paddingHoz*2),
  })
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  })

  return (
    <Animated.View 
      style={{
        zIndex: -1,
        position: 'absolute',
        height: 36,
        width: indicatorWidth,
        left: -paddingHoz,
        backgroundColor: '#e1fff3',
        // backgroundColor: Theme.primary,
        transform: [{
          translateX
        }],
        top: -7,
        borderRadius: 17,
        borderColor: 'rgba(0,0,0,0.05)',
        borderWidth: 0.5
      }}
    />
  )
}

const Tabs = ({data, scrollX, onItemPress, pageNumber}) => {
  const config = useSelector((state) => state.config);
  const [measures, setMeasures] = React.useState([])
  const containerRef = React.useRef()
  
  React.useEffect(() => {
    const m = []
    data.forEach( item => {
      item.ref.current.measureLayout(
        containerRef.current, 
        (x, y, width, height) => {
          m.push({
            x, 
            y, 
            width, 
            height
          })
          if (m.length === data.length) {
            setMeasures(m)
          }
        }
      )
    })
  }, [config.language])

  return (
    <View style={styles.tabsContainer}>
      <View 
        ref={containerRef}
        style={styles.tabsWrapper}>
        {data.map((item, index) => {
          return <Tab key={item.key} item={item} ref={item.ref} onItemPress={() => onItemPress(index)} selected={pageNumber===index}/>
        })}
        {measures.length > 0 && <Indicator measures={measures} scrollX={scrollX}/>}
      </View>
    </View>
  )
}

export default function Main(props) {
  const config = useSelector((state) => state.config);
  const [pageNumber, setPageNumber] = useState(-1)
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef()
  const onItemPress = React.useCallback(itemIndex => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width
    })
  })

  React.useEffect(() => {
    if( config.language !== 'en' ) {
      // setPageNumber(2)
      ref?.current?.scrollToOffset({
        offset: 2 * width
      })
    }
    else {
      // setPageNumber(0)
      ref?.current?.scrollToOffset({
        offset: 0
      })
    }

  }, [config.language])

  return (
    <View style={styles.container}>
        <StatusBar barStyle='dark-content' translucent={true} backgroundColor={'transparent'}/>
      
        <Tabs  data={config.language == 'en' ? data : data_reverse} scrollX={scrollX} onItemPress={onItemPress} pageNumber={pageNumber}/>

        <Animated.FlatList
          ref={ref}
          data={config.language == 'en' ? data : data_reverse}
          keyExtractor={item => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: {x: scrollX} } }],
            { useNativeDriver: false,
              listener: event => {
                let newPage = Math.round(parseFloat((event.nativeEvent.contentOffset.x)/width))
                if(pageNumber !== newPage) {
                  // setPageNumber(newPage)
                }
              },
            }
          )}
          bounces={false}
          renderItem={({item}) => {
            return (
              <View style={{width, backgroundColor: 'white'}}>
                {item.title == 'Promos' && <PromosScreen/>}
                {item.title == 'Home' && <HomeScreen/>}
                {item.title == 'Chat' && <ChatScreen/>}
              </View>
            )
          }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  circle: {
    zIndex: 1,
    position: 'absolute',
    top: -6,
    left: -6,
    width: 17,
    height: 17,
    borderRadius: 100,
    backgroundColor: '#F34E4E',
  },
  circle_rtl: {
    zIndex: 1,
    position: 'absolute',
    top: -6,
    right: -6,
    width: 17,
    height: 17,
    borderRadius: 100,
    backgroundColor: '#F34E4E',
  },
  tabText: {
    color: Theme.primary, 
    fontSize: 14,
    fontWeight: 'bold', 
    paddingLeft: 5
  },
  tabText_rtl: {
    color: Theme.primary, 
    fontSize: 14, 
    fontWeight: 'bold', 
    paddingRight: 5
  },
  tabsContainer: {
    marginTop: 49, 
    width, 
    paddingHorizontal: 30, 
    paddingBottom: 20,
    borderBottomColor: '#eee', 
    borderBottomWidth: 0.5,
  },
  tabsWrapper: {
    justifyContent: 'space-between', 
    flexDirection: 'row',
  },
  tabsShadow: {
    shadowColor: "#000",
    shadowOffset:{
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.22,
    elevation: 3,
  }
});
