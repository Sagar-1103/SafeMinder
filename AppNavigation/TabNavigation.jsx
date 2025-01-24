import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import Maps from '../components/Maps';

// Importing images
import HomeIcon from '../assets/Home.png';
import HomeActiveIcon from '../assets/homeActive.png';
import HealthIcon from '../assets/health.png';
import HealthActiveIcon from '../assets/healthActive.png';
import MedicationIcon from '../assets/Medication.png';
import MedicationActiveIcon from '../assets/MedicationActive.png';
import ProfileIcon from '../assets/Profile.png';
import ProfileActiveIcon from '../assets/profileActive.png';
import ReportsCaretakerPage from "../screens/caretakerScreens/ReportCaretakerPage"
import ProfilePage from '../components/ProfilePage';

const Tab = createBottomTabNavigator();

const tabData = [
    {
        name: 'Location',
        component: Maps,
        icons: {
            inactive: HomeIcon,
            active: HomeActiveIcon,
        },
    },
    {
        name: 'Health',
        component: ReportsCaretakerPage,
        icons: {
            inactive: HealthIcon,
            active: HealthActiveIcon,
        },
    },
    {
        name: 'Medicine',
        component: ReportsCaretakerPage,
        icons: {
            inactive: MedicationIcon,
            active: MedicationActiveIcon,
        },
    },
    {
        name: 'Profile',
        component: ProfilePage,
        icons: {
            inactive: ProfileIcon,
            active: ProfileActiveIcon,
        },
    },
];

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#fff', // Clean white background
                    borderTopWidth: 0, // No border line
                    height: 60, // Compact size
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                },
                tabBarActiveTintColor: '#f3765f', // Active icon color
                tabBarInactiveTintColor: '#6c757d', // Inactive icon color
                tabBarLabelStyle: {
                    fontSize: 10, // Smaller labels
                    fontWeight: '500', // Lighter font weight for minimalism
                    marginBottom: 7
                },
                tabBarIconStyle: {
                    width: 24,
                    height: 24,
                    margin: 0,
                },
            }}
        >
            {tabData.map((tab, index) => (
                <Tab.Screen
                    key={index}
                    name={tab.name}
                    component={tab.component}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={focused ? tab.icons.active : tab.icons.inactive}
                                style={{
                                    width: 24,
                                    height: 24,
                                    
                                }}
                            />
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

export default TabNavigation;
