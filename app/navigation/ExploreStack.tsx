import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Explore from "../../screens/Explore";
import sendPay from "@/screens/sendPay";
import receivePay from "@/screens/receivePay";



export type ExploreStackParamList = {
    Explore: undefined;
  sendPay: undefined;
  receivePay: undefined; 
};

const Stack = createNativeStackNavigator<ExploreStackParamList>();

export default function AdminManagementStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name="Explore" 
            component={Explore}
            options={{ headerShown: false }}
        />
      <Stack.Screen 
        name="sendPay" 
        component={sendPay}
        options={{ title: "Send Payment" }}
      />
      <Stack.Screen 
        name="receivePay" 
        component={receivePay}
        options={{ title: "Receive Payment" }}
      />
    </Stack.Navigator>
  );
}
