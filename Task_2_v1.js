import * as React from 'react';
import { Text, View, Image, FlatList, Button, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const SALADS = [
  {
    title: "Caesar salad",
    image: "",
    ingredients: ["150g of lettuce\n", "2 eggs\n", "50g of croutons\n", "35g of caesar dressing\n", "30g of parmesan cheese\n"]
  },
  {
    title: "Shrimp salad",
    image: "",
    ingredients: ["200g of shrimps\n", "100g of spinach\n", "1 avocado\n", "half of lemon\n", "1 tablespoon of olive oil\n"]
  },
  {
    title: "Roasted potato salad",
    image: "",
    ingredients: ["200g of potatoes\n", "200g of kale\n", "1 avocado\n", "25g of feta\n"]
  }
]

const DRINKS = [
  {
    title: "Apple and carrot juice",
    image: "",
    ingredients: ["5 apples\n", "3 carrots\n"]
  },
  {
    title: "Summer smoothie",
    image: "",
    ingredients: ["25g of strawberries\n", "25g of blueberries\n", "2 kiwi\n", "300ml of water\n"]
  },
  {
    title: "Green smoothie",
    image: "",
    ingredients: ["1 avocado\n", "100g of spinach\n", "1 banana\n", "300ml of water\n"]
  }
]

function GetRecipes (title) {
  return (
    title === 'Fish' ? FISH : 
    (title === 'Pasta' ? PASTA : 
    (title === 'Salads' ? SALADS : 
    (title === 'Deserts' ? DESERTS : 
    (title === 'Drinks' ? DRINKS : null))))
  );
}

function HomeScreen() {
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.homeTitle}>Healthy</Text>
      <Text style={styles.homeTitle}>Food</Text>
      <Text style={styles.homeTitle}>Recipes</Text>
      <Image style={{width: '5%', height: '5%'}} source={{uri: 'https://favpng.com/png_view/healthy-food-icon-healthy-icon-diet-icon-png/PB8cmKuk'}}/>
    </View>
  );
}

function RecipesScreen({ route, navigation }) {
  const Recipes = GetRecipes(route.name)
  return (
    <View>
      <FlatList
        data={Recipes}
        renderItem={({item}) => (
          <Button 
            style={styles.button}
            title={item.title} 
            onPress={() => navigation.navigate('RecipeTabs', {screen: 'Recipe', params: item})}
          />
        )}
      />
    </View>
  );
}

function CommentsScreen() {
  return (
    <View>
      <Text>No comments yet...</Text>
    </View>
  );
}

function RecipeScreen({ route }) {
  const { title, image, ingredients} = route.params;
  return (
      <View style={styles.recipeScreen}>
        <Text style={styles.recipeTitle}>{title}</Text>
        <Text>{ingredients}</Text>
      </View>
  );
}

function RecipesTabs ({ route }) {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name={route.name} component={RecipesScreen}/>
      <Tab.Screen name="Comments" component={CommentsScreen}/>
    </Tab.Navigator>
  )
}

function RecipeTabs () {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Recipe" component={RecipeScreen}/>
      <Tab.Screen name="Comments" component={CommentsScreen}/>
    </Tab.Navigator>
  )
}

function RecipesTabsStack ({ route }) {
  return (
    <Stack.Navigator /*screenOptions={{headerShown: false}}*/>
      <Stack.Screen 
        name={route.name}
        component={RecipesTabs} 
        options={{title: "Recipes", headerShown: false}}
      />
      <Stack.Screen 
        name="RecipeTabs" 
        component={RecipeTabs} 
        options={{title: "Back to recipes"}}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen}/>
        <Drawer.Screen name="Fish" component={RecipesTabsStack}/>
        <Drawer.Screen name="Pasta" component={RecipesTabsStack}/>
        <Drawer.Screen name="Salads" component={RecipesTabsStack}/>
        <Drawer.Screen name="Deserts" component={RecipesTabsStack}/>
        <Drawer.Screen name="Drinks" component={RecipesTabsStack}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 150,
    backgroundColor: 'white'
  },
  homeScreen: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  recipeScreen: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10
  },
  homeTitle: {
    fontFamily: 'Century Gothic',
    fontWeight: 'bold',
    fontSize: 50
  },
  recipeTitle: {
    fontFamily: 'Century Gothic',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15
  },
})