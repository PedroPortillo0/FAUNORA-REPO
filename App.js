import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './src/pages/userView/LandingPage';
import LoginPage from './src/pages/userView/LoginPage'; 
import RegisterPage from './src/pages/userView/RegisterPage';
import VeterinarianLoginPage from './src/pages/veterinarianView/VeterinarianLoginPage';
import VeterinarianRegisterPage from './src/pages/veterinarianView/VeterinarianRegisterPage';
import RecoverPasswordPage from './src/pages/RecoverPasswordPage';
import ChangePasswordPage from './src/pages/ChangePasswordPage';
import VeterinarianHomePage from './src/pages/veterinarianView/VeterinarianHomePage';
import VeterinaryPetsHome from './src/pages/veterinarianView/VeterinaryPetsHome';
import VeterinarianPetDetails from './src/pages/veterinarianView/VeterinarianPetDetails';
import VeterinarianAddPerson from './src/pages/veterinarianView/VeterinarianAddPerson';
import VeterinarianDatePage from './src/pages/veterinarianView/VeterinarianDatePage';
import HomePage from './src/pages/userView/HomePage';
import PetDetails from './src/pages/userView/PetDetails';
import UserProfile from './src/pages/userView/ProfilePage';
import MyCalendarScreen from './src/pages/userView/DatesPage';
import PetForm from './src/pages/userView/AddPetPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen 
          name="Landing" 
          component={LandingPage} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginPage} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterPage} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="VeterinarianLogin" 
          component={VeterinarianLoginPage} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="VeterinarianRegister" 
          component={VeterinarianRegisterPage} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="RecoverPassword" 
          component={RecoverPasswordPage} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ChangePassword" 
          component={ChangePasswordPage} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="VeterinarianHome" 
          component={VeterinarianHomePage} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="VeterinaryPetsHome" 
          component={VeterinaryPetsHome} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="VeterinarianPetDetails" 
          component={VeterinarianPetDetails} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="VeterinarianAddPerson" 
          component={VeterinarianAddPerson} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="VeterinarianDatePage" 
          component={VeterinarianDatePage} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="HomePage" 
          component={HomePage} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PetDetails" 
          component={PetDetails} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="UserProfile" 
          component={UserProfile} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="MyCalendarScreen" 
          component={MyCalendarScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PetForm" 
          component={PetForm} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
