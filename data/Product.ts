// Product/products.ts
import { ImageSourcePropType } from "react-native";
export interface Product {
    id: number;
  name: string;
price: number | string; // string for half/full cases
description: string;
category: string;

tags?: ("must-try" | "popular" | "todays-special")[];
images?: ImageSourcePropType;
}

const products: Product[] = [
   {id:1, name: "Aam Panna", price: 70, description: "A benagli favourite , Raw mango drink spike with jeera ", category: "Beverages", tags: ["must-try", "popular"],images:require('../assets/images/product/1.png') },
  { id:2 , name: "Fresh Lime Soda", price: 70, description: "Squeezed lime juice with water (sweet/salted)", category: "Beverages", tags: ["popular"],images:require('../assets/images/product/2.png') },
  { id:3, name: "Soft Drinks", price: 50, description: "", category: "Beverages",images:require('../assets/images/product/3.png') },
  { id:4, name: "Bottle Water", price: 30, description: "", category: "Beverages",images:require('../assets/images/product/4.png') },

  // Veg Starter
  { id:5, name: "Begun Bhaaja (2pc)", price: 80, description: "Sliced eggplant marinated with authentic Bengali spices & deep fried",images:require("../assets/images/product/Begun bhaaja [2 pieces].png"), category: "Veg Starter", tags: ["popular"] },
  { id:6, name: "Beguni (2pc)", price: 90, description: "Sliced eggplant coated with bengali gram flour & deep fried", images:require("../assets/images/product/Beguni [2 pieces].png"),category: "Veg Starter" },
  { id:7, name: "Jhoori Aloo Bhaja", price: 100, description: "Grated Potato crispy fried", images:require("../assets/images/product/Jhoori aloo bhaja.png"),category: "Veg Starter" },
//   { id:8, name: "Veg Chop (2pc)", price: 100, description: "Vegetable mix chop coated with breadcrumbs and fried.", category: "Veg Starter" },
  { id:8, name: "Veg Chop (2pc)", price: 100, description:"Crumbed & fried croquets with mixedvegetable filling",images:require("../assets/images/product/Veg chop [2 pieces].png"), category: "Veg Starter" },
  { id:9, name: "Veg Cutlet (2pc)", price: 130, description: "A Classic bengali style veg cutlet", images:require("../assets/images/product/Veg cutlet [2 pieces].png"),category: "Veg Starter" },
  // { id:10, name: "Paneer Cutlet (2pc)", price: 150, description: "Grated & marinated Paneer, Coated with bread crumbs & deep fried ", images:require("../assets/images/product/Paneer cutlet [2 pieces].png"), category: "Veg Starter" },
  // { id:11, name: "Paneer Finger (6pc)", price: 180, description: "Paneer marinated in bengali spices,coated with bread crumbs & deep fried ", images:require("../assets/images/product/Paneer finger [6 pieces].png"), category: "Veg Starter", tags: ["must-try"] },
  // { id:12, name: "Posto Bora (4pc)", price: 220, description: "Poppy seeds cakes, deep fried to perfect golden brown", images:require("../assets/images/product/Posto bora [4 pieces].png"), category: "Veg Starter" },
  // Non-Veg Starter
  // { id:13, name: "Fish Chop (2pc)", price: 200, description: "Spicy fish mixture coated with breadcrumbs and deep-fried.", category: "Non-Veg Starter" },
  // { id:14, name: "Katla Maach Bhaja (2pc)", price: 215, description: "Crispy fried pieces of Katla fish.", images:require("../assets/images/product/Katla Maach Bhaja [2 pieces].png"), category: "Non-Veg Starter" },
  { id:15, name: "Bhetki Fish Kabiraji (1pc)", price: 250, description: "Iconic Kolkata snack – crispy fish fillet wrapped in egg coating.",images:require("../assets/images/product/Bhetki fish kabiraji [1 piece].png"), category: "Non-Veg Starter", tags: ["must-try", "popular"] },
  { id:16, name: "Fish Fry (2pc)", price: 275, description: "Golden fried Bhetki fish fillet with breadcrumbs – a Kolkata street food legend.",images:require("../assets/images/product/Fish fry [2 pieces].png"), category: "Non-Veg Starter", tags: ["popular"] },
  // { id:17, name: "Fish Orley (2pc)", price: 300, description: "Batter fried fish fillets.", images:require("../assets/images/product/Fish Orley [2 pieces].png"), category: "Non-Veg Starter" },
  { id:18, name: "Fish Finger (6pc)", price: 300, description: "Golden fried fish sticks with tartar dip.",images:require("../assets/images/product/Fish finger [6 pieces].png"), category: "Non-Veg Starter" },
  // { id:19, name: "Hilsa Maach Bhaja (1pc)", price: 450, description: "Fried Hilsa fish, the king of Bengali cuisine.", category: "Non-Veg Starter", tags: ["must-try"] },

  // Eggs Starter
  { id:20, name: "Egg Devil (2pc)", price: 100, description: "Stuffed egg chop coated with breadcrumbs and deep-fried.",images:require("../assets/images/product/Egg devil [2 pieces].png"), category: "Eggs", tags: ["popular"] },
  // { id:21, name: "Chicken Egg Devil (2pc)", price: 160, description: "Egg chop stuffed with chicken filling.", images:require("../assets/images/product/Chicken egg devil [2 pieces].png"), category: "Eggs" },
  // { id:22, name: "Mutton Egg Devil (2pc)", price: 250, description: "Egg chop stuffed with mutton filling.", images:require("../assets/images/product/Mutton egg devil [2 pieces].png"), category: "Eggs" },

  // Mutton Starter
  // { id:23, name: "Mutton Chop (2pc)", price: 225, description: "Minced mutton chop, coated and fried.", images:require("../assets/images/product/Mutton Chop [2 pieces].png"), category: "Mutton Starter" },
  // { id:24, name: "Mutton Cutlet (2pc)", price: 250, description: "Crispy fried minced mutton cutlet.", images:require("../assets/images/product/Mutton Cutlet [2 pieces].png"), category: "Mutton Starter" },

  // Chicken Starter
  // { id:25, name: "Chicken Chop (2pc)", price: 175, description: "Spicy chicken chop, deep fried with coating.", images:require("../assets/images/product/Chicken Chop [2 pieces].png"), category: "Chicken Starter" },
  // { id:26, name: "Chicken Cutlet (2pc)", price: 200, description: "Crispy fried minced chicken cutlet.", images:require("../assets/images/product/Chicken Cutlet [2 pieces].png"), category: "Chicken Starter" },

  // Prawns Starter
  // { id:27, name: "Prawns Kabiraji (1pc)", price: 295, description: "Prawn cutlet wrapped in crispy egg net.", images:require("../assets/images/product/Prawns Kabiraji [1 piece].png"), category: "Prawns Starter" },
  // { id:28, name: "Golden Fried Prawns (6pc)", price: 325, description: "Crispy golden fried prawns.", images:require("../assets/images/product/Golden Fried Prawns [6 pieces].png"), category: "Prawns Starter" },
  // { id:29, name: "Prawns Batter Fry (6pc)", price: 325, description: "Batter coated and fried prawns.", images:require("../assets/images/product/Prawns Batter Fry [6 pieces].png"), category: "Prawns Starter" },
  // { id:30, name: "Prawns Cutlet (2pc)", price: 300, description: "Minced prawn cutlet, crispy fried.", images:require("../assets/images/product/Prawns Cutlet [2 pieces].png"), category: "Prawns Starter" },

  // Main Course Veg
  // { id:31, name: "Aloo Potol Kasha/Dalna", price: 140, description: "Spicy pointed gourd and potato curry.",images:require("../assets/images/product/Aloo potol kasha or dalna.png"), category: "Main Course Veg" },
  // { id:32, name: "Aloo Phulkopir Dalna", price: 140, description: "Potato and cauliflower curry in Bengali style.", images: require("../assets/images/product/Aloo Phulkopir Dalna.png"), category: "Main Course Veg" },
  { id:33, name: "Sukto", price: 140, description: "Traditional bitter vegetable medley curry.", images: require("../assets/images/product/Sukto.png"), category: "Main Course Veg" },
  { id:34, name: "Dhokar Dalna (6pc)", price: 150, description: "Lentil cakes cooked in spicy gravy.",images:require("../assets/images/product/Dhokar dalna [6 pieces].png"), category: "Main Course Veg" },
  // { id:35, name: "Mochar Ghonto", price: 170, description: "Banana flower curry cooked with spices.", images: require("../assets/images/product/Mochar Ghonto.png"), category: "Main Course Veg" },
  { id:36, name: "Aloo Posto", price: 170, description: "Potato cooked with poppy seed paste.", images: require("../assets/images/product/Aloo posto.png"), category: "Main Course Veg" },
  // { id:37, name: "Enchor Dalna (Seasonal)", price: 200, description: "Raw jackfruit curry, seasonal delicacy.", images: require("../assets/images/product/Enchor Dalna.png"), category: "Main Course Veg" },
  // { id:38, name: "Chanar Dalna (6pc)", price: 200, description: "Fresh paneer balls cooked in gravy.", images: require("../assets/images/product/Chanar Dalna [6 pieces].png"), category: "Main Course Veg" },
  // { id:39, name: "Paneer Butter Masala (8pc)", price: 250, description: "Paneer cubes cooked in buttery tomato gravy.", images: require("../assets/images/product/Paneer Butter Masala [8 pieces].png"), category: "Main Course Veg" },
  { id:40, name: "Matar Paneer", price: 250, description: "Paneer and peas cooked in rich gravy.", images: require("../assets/images/product/Muttor paneer.png"), category: "Main Course Veg" },
  { id:41, name: "Paneer Masala", price: 275, description: "Spicy paneer curry with rich masala base.", images: require("../assets/images/product/Paneer masala.png"), category: "Main Course Veg" },

  // Main Course Non-Veg - Fish
  // { id:42, name: "Muri Ghonto", price: 180, description: "Bengali fish head curry with rice and spices.", images: require("../assets/images/product/Muri Ghonto.png"), category: "Main Course Fish" },
  { id:43, name: "Katla Begun Bori Data Diye Patla Jhol", price: 260, description: "Light curry with Katla fish, brinjal, and lentil dumplings.", images: require("../assets/images/product/Katla begun bori data diye jhol.png"), category: "Main Course Fish" },
  { id:44, name: "Katla Kalia (2pc)", price: 250, description: "Spicy Katla fish curry cooked with onions and spices.", images: require("../assets/images/product/Katla kalia [2 pieces].png"), category: "Main Course Fish" },
  { id:45, name: "Pabda Jhal (1pc)", price: 280, description: "Pabda fish cooked in mustard and spices.", images: require("../assets/images/product/Pabda jhal.png"), category: "Main Course Fish" },
  { id:46, name: "Pabda Shorse (1pc)", price: 280, description: "Pabda fish in mustard sauce.", images: require("../assets/images/product/Pabda shorshe.png"), category: "Main Course Fish" },
  // { id:47, name: "Pabda Begun Bori Jhol (1pc)", price: 300, description: "Pabda curry with brinjal and lentil dumplings.", images: require("../assets/images/product/Pabda Begun Bori Jhol [1 piece].png"), category: "Main Course Fish" },
  { id:48, name: "Doi Pona (2pc)", price: 275, description: "Rohu fish cooked in curd based gravy.", images:require("../assets/images/product/Doi pona [2 pieces].png"),category: "Main Course Fish" },
  // { id:49, name: "Katla Do Peyaza", price: 290, description: "Spicy Katla curry with onions cooked in two stages.", category: "Main Course Fish" },
  // { id:50, name: "Rui Dum Posto (2pc)", price: 290, description: "Rohu fish cooked with poppy seed paste.", category: "Main Course Fish" },
  { id:51, name: "Bhetki Macher Shorshe Jhal (2pc)", price: 300, description: "Bhetki fish cooked in mustard paste gravy.", images:require("../assets/images/product/Bhetki macher shorshe jhal [2 pieces].png"),category: "Main Course Fish", tags: ["must-try"] },
  { id:52, name: "Bhetki Macher Kalia", price: 300, description: "Rich onion-tomato gravy cooked with Bhetki.", images: require("../assets/images/product/Bhetki macher kalia.png"), category: "Main Course Fish" },
  // { id:53, name: "Bhetki Macher Do Peyaza", price: 300, description: "Bhetki cooked with double onions.", category: "Main Course Fish" },
  // { id:54, name: "Bhetki Paturi (2pc)", price: 325, description: "Fish fillet marinated in mustard and steamed in banana leaf.", category: "Main Course Fish", tags: ["must-try"] },
  // { id:55, name: "Katla Dum Posto (2pc)", price: 310, description: "Katla fish cooked in poppy seed paste.", category: "Main Course Fish" },
  { id:56, name: "Pomfret Shorshe Jhal", price: 500, description: "Pomfret fish cooked in mustard sauce.", category: "Main Course Fish", images:require("../assets/images/product/Pomfret jhal.png") },
  // { id:57, name: "Ilish Beguner Jhol (1pc)", price: 700, description: "Hilsa fish with brinjal in light curry.", category: "Main Course Fish", tags: ["todays-special"] },
  // { id:58, name: "Doi Ilish", price: 700, description: "Hilsa cooked in curd-based gravy.", category: "Main Course Fish" },
  { id:59, name: "Ilish Shorshe Bhapa (1pc)", price: 700, description: "Steamed Hilsa with mustard paste.", category: "Main Course Fish", tags: ["must-try"], images:require("../assets/images/product/Ilish shorshe bhapa.png") },
  // { id:60, name: "Chital Macher Peti (1pc)", price: 600, description: "Chital fish belly piece curry.", category: "Main Course Fish",  images: require("../assets/images/product/Bhetki Chital maacher peti.png") },
  { id:61, name: "Chital Macher Muitha (4pc)", price: 300, description: "Chital fish balls cooked in spicy gravy.", category: "Main Course Fish" , images: require("../assets/images/product/Chital macher muitha.png")},

  // Eggs Main Course
  { id:62, name: "Deem Kosha (3pc)", price: 150, description: "Spicy egg curry with onions and spices.", images:require("../assets/images/product/Deem kosha [3 pieces].png"),category: "Main Course Eggs" },
  // { id:63, name: "Deem Aloo Jhol (3pc)", price: 175, description: "Egg and potato curry in light Bengali gravy.", category: "Main Course Eggs" },

  // Prawns Main Course.
  // { id:64, name: "Mochar Chingri", price: 300, description: "Banana flower cooked with prawns.", category: "Main Course Prawns" },
  // { id:65, name: "Prawns Masala (6pc)", price: 370, description: "Spicy masala prawns cooked in thick gravy.", category: "Main Course Prawns" },
  // { id:66, name: "Prawns Curry (6pc)", price: 370, description: "Traditional Bengali prawn curry.", category: "Main Course Prawns" },
  // { id:67, name: "Chingri Macher Korma (6pc)", price: 370, description: "Prawns cooked in Mughlai style korma.", category: "Main Course Prawns" },
  { id:68, name: "Chingri Malai Curry (6pc)", price: 375, description: "Signature Bengali delicacy of prawns cooked in coconut milk and spices.", images: require("../assets/images/product/Chingri malai curry [6 pieces].png"), category: "Main Course Prawns", tags: ["must-try", "popular"] },
  { id:69, name: "Daab Chingri (6pc)", price: 420, description: "Prawns slow cooked inside tender coconut with spices.", images: require("../assets/images/product/Daab chingri [6 pieces].png"), category: "Main Course Prawns", tags: ["todays-special"] },
  // { id:70, name: "Chingri Bhapa", price: 350, description: "Steamed prawns in mustard and curd paste.", category: "Main Course Prawns" },
  // { id:71, name: "Enchor Chingri", price: 300, description: "Jackfruit cooked with prawns.", category: "Main Course Prawns" },

  // Chicken Main Course
  // { id:72, name: "Chicken Chaap (2pc)", price: 275, description: "Mughlai style slow-cooked chicken with rich gravy.", category: "Main Course Chicken", tags: ["must-try", "todays-special"] },
  { id:73, name: "Chicken Kosha (4pc)", price: 270, description: "Spicy Bengali style chicken curry.", images: require("../assets/images/product/Chicken kosha [4 pieces].png"), category: "Main Course Chicken" },
  { id:74, name: "Chicken Dukbanglow (4pc)", price: 280, description: "Colonial-era style chicken curry with boiled egg and potato.", images: require("../assets/images/product/Chicken dukbanglow [4 pieces].png"), category: "Main Course Chicken" },
  // { id:75, name: "Murgi Aloo Diye Jhol (4pc)", price: 270, description: "Light curry of chicken and potato.", category: "Main Course Chicken" },
  // { id:76, name: "Doi Chicken (4pc)", price: 280, description: "Curd-based chicken curry.", category: "Main Course Chicken" },
  { id:77, name: "Sundarban Chicken (4pc)", price: 280, description: "Spicy chicken curry inspired by Sundarbans style.",images:require("../assets/images/product/Sundarban chicken [4 pieces].png"), category: "Main Course Chicken" },
  // { id:78, name: "Chicken Rezala (4pc)", price: 280, description: "Mughlai dish – white gravy chicken curry with subtle flavors.", category: "Main Course Chicken" },

  // Mutton Main Course
  { id:79, name: "Mutton Kosha (4pc)", price: 450, description: "Spicy Bengali-style mutton curry, slow cooked with onions and spices.",images:require("../assets/images/product/Mutton kosha [4 pieces].png"), category: "Main Course Mutton", tags: ["must-try", "popular", "todays-special"] },
  // { id:80, name: "Kochi Pathar Mangser Jhol (4pc)", price: 450, description: "Light curry of tender mutton with potato.", category: "Main Course Mutton" },
  { id:81, name: "Doi Mutton (4pc)", price: 460, description: "Curd-based mutton curry.", images: require("../assets/images/product/Doi motton [4 pieces].png"), category: "Main Course Mutton" },
  { id:82, name: "Mutton Dukbanglow (4pc)", price: 470, description: "Colonial-era mutton curry with egg and potato.",images:require("../assets/images/product/Mutton dukbanglow.png") ,category: "Main Course Mutton" },
  { id:83, name: "Sundarban Mutton (4pc)", price: 470, description: "Spicy mutton curry cooked with Sundarban flavors.",images:require("../assets/images/product/Sundarban mutton [4 pieces].png"), category: "Main Course Mutton" },
  { id:84, name: "Mutton Rezala (4pc)", price: 470, description: "Mughlai white gravy mutton curry with subtle flavor.",images:require("../assets/images/product/Mutton rezala [4 pieces].png"), category: "Main Course Mutton" },

  // Dal
  // { id:85, name: "Aam Tok Dal (Seasonal)", price: 120, description: "Tangy mango dal, seasonal delicacy.", category: "Dal" },
  { id:86, name: "Cholar Dal", price: 120, description: "Bengali chana dal cooked with coconut and spices.", images: require("../assets/images/product/Cholar dal.png"), category: "Dal" },
  { id:87, name: "Song Moong Dal Motorsuti Diye", price: 120, description: "Moong dal cooked with peas.", category: "Dal"},
  // { id:88, name: "Masoor Dal", price: 130, description: "Red lentil with onion, green chilies and tomato", images:require("../assets/images/product/Masoor Dal.png"), category: "Dal" },
  { id:89, name: "Gondharaj Dal", price: 140, description: "A light and aromatic Bengali lentil dish flavored with the zest and juice of Gondhoraj lebu (fragrant lime). Typically made with moong or masoor dal, it’s gently spiced and finished with a tempering of mustard seeds, green chilies, and curry leaves.", images:require("../assets/images/product/Gondhoraj dal.png"), category: "Dal" },
  { id:90, name: "Macher Matha Diye Dal", price: 160, description: "Split moong dal with fish head",images:require("../assets/images/product/Macher Matha Diye Dal.png"), category: "Dal"},
 // Rice, Pulao
   { id:91, name: "Steamed Rice Half / Full", price: 80/120, description: "Tangy mango dal, seasonal delicacy.",images:require("../assets/images/product/Steamed Rice.png"), category: "Rice, Pulao" },
  // { id:92, name: "Ghee Bhaat", price: 150, description: "Long grained basmati rice mixed with desi ghee & green chillies flavour", images:require("../assets/images/product/Ghee Bhaat.png"), category: "Rice, Pulao" },
  { id:93, name: "Jeera Rice", price: 150, description: "Long grained basmati rice mixed flavour with cumins & desi ghee.",images:require("../assets/images/product/Jeera Rice.png"), category: "Rice, Pulao"},
  { id:94, name: "Basanti Pulao", price: 200, description: "A long grained fragrant basanti pulao with saffron, whole spices & dry fruits", images:require("../assets/images/product/Basanti Pulao.png"), category: "Rice, Pulao" },
  { id:95, name: "Veg Pulao", price: 170, description: "A mix vegetables Pulao in bengali style", images:require("../assets/images/product/Veg Pulao.png"), category: "Rice, Pulao" },
  { id:96, name: "Peas Pulao", price: 17, description: "Green Peas pulao in bengali style", images:require("../assets/images/product/Peas Pulao.png"), category: "Rice, Pulao" },
// Biryani
   { id:97, name: "Egg Biryani (2 Eggs)", price: 225, description: "Eggs & Aloo in Long grained fragrant rice, flavoured with exotic spices and saffron", images:require("../assets/images/product/Egg Biryani.png"), category: "Biryani" },
  { id:98, name: "Chicken Biryani Kolkata Style", price: 300, description: "Long grained basmati rice, flavoured with exotic spices and saffron, layered with chicken cooked in dum served with aloo & egg", images:require("../assets/images/product/Chicken Biryani Kolkata Style.png"), category: "Biryani" },
  { id:99, name: "Mutton Biryani Kolkata Style", price: 450, description: "Long grained basmati rice ,flavoured with exotic spices and saffron, layered with Mutton cooked in dum served with aloo & egg ", images:require("../assets/images/product/Mutton Biryani Kolkata Style.png"), category: "Biryani" },
  { id:100, name: "Egg Biryani", price: 280, description: "Basmati rice cooked with spiced boiled eggs.", images:require("../assets/images/product/Egg Biryani.png"), category: "Biryani" },
  { id:101, name: "Prawn Biryani", price: 320, description: "Long grained basmati rice, flavoured with exotic spices and saffron, layered with prawn cooked in dum served with aloo & egg", images:require("../assets/images/product/Prawn Biryani.png"), category: "Biryani" },
  //Bread
  { id:102, name: "Bangla Paratha (1 pc)", price: 40, description: "Whole wheat triangular flat bread",images:require("../assets/images/product/Bangla Paratha.png"), category: "Bread" },
  { id:103, name: "Dhakai Paratha (1 pc) ", price: 50, description: "A paratha stuffed with dal paste & deep fried",images:require("../assets/images/product/Dhakai Paratha.png"), category: "Bread" },
  { id:104, name: "Luchi (4 pc)", price: 80, description: "A classic maida puri in bengali style", images:require("../assets/images/product/Luchi (4 pc).png"), category: "Bread" },
  { id:105, name: "Radhaballavi (2 pc)", price: 100, description: "Soft pooris are stuffed with a spiced dal filling", images:require("../assets/images/product/Radhaballavi.png"), category: "Bread" },
  // { id:106, name: "Karai Shutir Kachori (4 pc)", price: 100, description: "Flavours of the green peas come through", images:require("../assets/images/product/Karai Shutir Kachori.png"), category: "Bread" },
  //Special Thaliw
  { id:107, name: "Special Veg Thali", price: 400, description: "Steam Rice , Moong Dal, Jhoori Aloo Bhaja, Muttor Paneer, Veg of The Day,Sweet, Chutney, Papad",images:require("../assets/images/product/Special Veg Thali.png") ,category: "Special Thali" },
  // { id:108, name: "Special Fish Thali", price: 470, description: "Steam Rice, Moong Dal, Jhoori Aloo Bhaja, Katla Or Rui Fish Curry (1pc), Veg of The Day, Sweet , Chutney, Papad", category: "Special Thali" },
  { id:109, name: "Special Mutton Thali", price: 600, description: "Steam Rice, Moong Dal, Jhoori Aloo Bhaja, Mutton Kosha (3 pc), Veg of The Day, Sweet, Chutney, Papad",images:require("../assets/images/product/Special Mutton Thali.png"), category: "Special Thali" },
  { id:110, name: "Special Chicken Thali", price: 500, description: "Steam Rice, Moong Dal, Jhoori Aloo Bhaja, Chicken Kosha (2 pc), Veg of The Day, Sweet, Chutney, Papad",images:require("../assets/images/product/Special Chicken Thali.png") ,category: "Special Thali" },

// Dessert
  // { id:111, name: "Misti Doi (1 serving)", price: 100, description: "Caramelised curd ,Mildly sweet , An absolute favourite ", category: "Dessert" },
  // { id:112, name: "Plain Payesh (1 serving)", price: 110, description: "A Thick kheer made from cottage cheese, Flavoured of Cardamon", category: "Dessert" },
  // { id:113, name: "Daab Payesh (1 serving) ", price: 125, description: "A Thick kheer made from tender coconut pulp & water, Flavoured of Cardamon & Saffron", category: "Dessert" },
// Chutney
  // { id:114, name: "Kacha Amer Chutney", price: 70, description: "Slices of unripe mangoes, complete with the skin, are sliced thickly and simmered in a rich, sweet syrupy mixture.", category: "Chutney" },
  // { id:115, name: "Tomato Khejur Chutney", price: 80, description: "The chutney contains tomatoes and dates simmers in sweet syrup", category: "Chutney" },
  // { id:116, name: "Peas Pulao", price: 17, description: "Green Peas pulao in bengali style", category: "Dessert" }














    // {
    //     id: 47,
    //     name: "Basanti pulao",
    //     description: "A long grained fragrant basanti pulao with saffron, whole spices and dry fruits.",
    //     price: "260",
    //     image: "g"
    // },
    // {
    //     id: 48,
    //     name: "Steamed rice",
    //     description: "Fluffy, steamed white rice, a versatile staple perfect as a side dish or base for any meal.",
    //     price: "156",
    //     image: require("../assets/images/product/48.png")
    // },
    // {
    //     id: 49,
    //     name: "Peas pulao",
    //     description: "Green peas pulao in bengali style.",
    //     price: "219",
    //     image: require("../assets/images/product/49.png")
    // },
    // {
    //     id: 50,
    //     name: "Ghee bhaat",
    //     description: "Long grained basmati rice mixed with desi ghee and green chillies flavour.",
    //     price: "195",
    //     image: require("../assets/images/product/50.png")
    // },
    // {
    //     id: 51,
    //     name: "Jeera rice",
    //     description: "Long grained basmati rice mixed flavour with cumins and desi ghee.",
    //     price: "195",
    //     image: require("../assets/images/product/51.png")
    // },
    // {
    //     id: 52,
    //     name: "Luchi [4 pieces]",
    //     description: "A classic maida puri in bengali style.",
    //     price: "104",
    //     image: require("../assets/images/product/52.png")
    // },
    // {
    //     id: 53,
    //     name: "Bangla paratha [1 piece]",
    //     description: "Whole wheat triangular flatbread.",
    //     price: "52",
    //     image: require("../assets/images/product/53.png")
    // },
    // {
    //     id: 54,
    //     name: "Karai shutir kachori [4 pieces]",
    //     description: "The stuffing is mildly spiced so that the flavours of the green peas come through.",
    //     price: "130",
    //     image: require("../assets/images/product/54.png")
    // },
    // {
    //     id: 55,
    //     name: "Dhakai pratha [1 piece]",
    //     description: "A paratha stuffed with dal paste and deep fried.",
    //     price: "65",
    //     image: "g"
    // },
    // {
    //     id: 56,
    //     name: "Radhaballavi [2 pieces]",
    //     description: "These soft pooris are stuffed with a spiced dal filling.",
    //     price: "130",
    //     image: require("../assets/images/product/56.png")
    // },
    // {
    //     id: 57,
    //     name: "Sona moong dal motorsuti diye",
    //     description: "Moong dal roasted with ghee and cooked in bengali style.",
    //     price: "156",
    //     image: require("../assets/images/product/57.png")
    // },
    // {
    //     id: 58,
    //     name: "Cholar dal",
    //     description: "Chana dal tempered with spices, fried coconut and ghee.",
    //     price: "156",
    //     image: require("../assets/images/product/58.png")
    // },
    // {
    //     id: 59,
    //     name: "Kacha Amer Chatni",
    //     description: "",
    //     price: "91",
    //     image: require("../assets/images/product/59.png")
    // },
    // {
    //     id: 60,
    //     name: "Bottle water",
    //     description: "",
    //     price: "30",
    //     image: ""
    // },
    // {
    //     id: 61,
    //     name: "egg Chicken Roll",
    //     description: "",
    //     price: "190",
    //     image: "0b9b61b.jpg"
    // },
    // {
    //     id: 62,
    //     name: "Chicken Roll",
    //     description: "",
    //     price: "175",
    //     image: "0b9b61b.jpg"
    // },
    // {
    //     id: 63,
    //     name: "Egg Roll",
    //     description: "A crispy and savory delight filled with scrambled eggs, perfect for a quick and satisfying meal on the go.",
    //     price: "150",
    //     image: "0b9b61b.jpg"
    // },
    // {
    //     id: 64,
    //     name: "Double Egg Roll",
    //     description: "",
    //     price: "195",
    //     image: ""
    // }
];


export default products;
