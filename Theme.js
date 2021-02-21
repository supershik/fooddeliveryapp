import { I18nManager } from "react-native"

//importing images
const logofull = require("./assets/images/logo_full.png")
const sample1 = require("./assets/images/sample1.png")
const sample2 = require("./assets/images/sample2.jpg")
const sample3 = require("./assets/images/sample3.jpg")
const sample4 = require("./assets/images/sample4.jpg")
const sample5 = require("./assets/images/sample5.jpg")
const sample6 = require("./assets/images/sample6.jpg")
const sample7 = require("./assets/images/sample7.jpg")
const sample8 = require("./assets/images/sample8.jpg")
const sample9 = require("./assets/images/sample9.png")
const sample10 = require("./assets/images/sample10.jpg")

const promos = require("./assets/images/promos.png")
const home = require("./assets/images/home.png")
const chat = require("./assets/images/chat.png")
const search = require("./assets/images/search.png")
const man = require("./assets/images/man.png")
const med = require("./assets/images/med.png")
const coffee = require("./assets/images/coffee.png")
const food = require("./assets/images/food.png")
const market = require("./assets/images/market.png")


export default {
  dark: false,

  //default colors
  white: "#fff",
  primary: "#14682D",
  primaryLight: "#1D9440",
  primaryExtraLight: '#06B160',
  red: '#ee2233',
  redLight: '#ff4444',

  poppins: I18nManager.isRTL ? "JFFlat-Regular" : "Poppins-Medium",
  poppinsbold: I18nManager.isRTL ? "JFFlat-Regular" : "Poppins-SemiBold",
  
  //assets
  chat,
  promos,
  home,
  search,
  man,
  med,
  coffee,
  food,
  market,
  logofull,
  sample1,
  sample2,
  sample3,
  sample4,
  sample5,
  sample6,
  sample7,
  sample8,
  sample9,
  sample10,
};
