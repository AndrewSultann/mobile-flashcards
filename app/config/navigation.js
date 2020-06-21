import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { blue, white, gray } from '../utils/colors'

import DeckList from '../components/DeckList'
import AddDeck from '../components/AddDeck'
import AddCard from '../components/AddCard'
import DeckView from '../components/DeckView'
import Quiz from '../components/Quiz'

// function getHeaderTitle(route) {
//     // Access the tab navigator's state using `route.state`
//     const routeName = route.state
//         ? // Get the currently active route name in the tab navigator
//         route.state.routes[route.state.index].name
//         : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
//         // In our case, it's "Feed" as that's the first screen inside the navigator
//         route.params?.screen || 'DeckList';

//     switch (routeName) {
//         case 'DeckList':
//             return 'Home';
//         case 'AddDeck':
//             return 'Add Deck';
//     }
// }


const AppTabs = createBottomTabNavigator();

const AppTabsScreen = () => (
    <AppTabs.Navigator
        initialRouteName='AppTabsScreen'
        tabBarOptions={{
            // styles for the text
            activeTintColor: Platform.OS === 'ios' ? blue : white,
            inactiveTintColor: Platform.OS === 'ios' ? blue : gray,
            // styles for the bar itself
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : blue,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }}
    >
        <AppTabs.Screen
            name='DeckList'
            component={DeckList}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
            options={{
                tabBarLabel: 'Deck List',
                tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
            }}

        />
        <AppTabs.Screen
            name='AddDeck'
            component={AddDeck}
            options={{
                tabBarLabel: 'Add Deck',
                tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
            }}
        />

    </AppTabs.Navigator>
)

const AppStacks = createStackNavigator()

const AppStackScreen = () => (
    <AppStacks.Navigator
        // headerMode='none'
        // to set options for all your screens
        screenOptions={{
            headerTintColor: white,
            headerStyle: { backgroundColor: blue }
        }}
    >
        <AppStacks.Screen
            name='AppTabsScreen'
            component={AppTabsScreen}
            // Options for my screen
            options={() => ({
                headerShown: false,
                headerTitleAlign: 'center'
            })}
        />
        <AppStacks.Screen
            name='DeckView'
            component={DeckView}
            // Options: we have route & navigation params available
            options={() => ({
                headerTitle: `Deck Details`,
                headerTitleAlign: "center",
                // I can overwrite the headerStyle set in Navigator
                headerStyle: { backgroundColor: blue }
            })}
        />
        <AppStacks.Screen
            name='AddCard'
            component={AddCard}
            options={() => ({
                headerTitle: `Add Card`,
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: blue }
            })}
        />
        <AppStacks.Screen
            name='Quiz'
            component={Quiz}
            options={() => ({
                headerTitle: `Quiz`,
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: blue }
            })}
        />
    </AppStacks.Navigator>
)


export default () => {

    return (
        <NavigationContainer>
            <AppStackScreen />
        </NavigationContainer>
    )
};

// import it in App -> index.js
