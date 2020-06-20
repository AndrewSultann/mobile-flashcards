import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { blue, white } from '../utils/colors'

import DeckList from '../components/DeckList'
import AddDeck from '../components/AddDeck'
import AddCard from '../components/AddCard'
import DeckView from '../components/DeckView'
import Quiz from '../components/Quiz'
import { color } from 'react-native-reanimated'




const AppTabs = createBottomTabNavigator();

const AppTabsScreen = () => (
    <AppTabs.Navigator
        initialRouteName='AppTabsScreen'
        tabBarOptions={{
            activeTintColor: Platform.OS === 'ios' ? blue : white,
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
        headerMode='none'
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
            options={{
                headerTitleAlign: "center",
                headerTitle: 'Home'
            }}
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
            // Options: we have route & navigation params available
            options={() => ({
                headerTitle: `Add Card`,
                headerTitleAlign: "center",
                // I can overwrite the headerStyle set in Navigator
                headerStyle: { backgroundColor: blue }
            })}
        />
        <AppStacks.Screen
            name='Quiz'
            component={Quiz}
            // Options: we have route & navigation params available
            options={() => ({
                headerTitle: `Quiz`,
                headerTitleAlign: "center",
                // I can overwrite the headerStyle set in Navigator
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
