import { StyleSheet } from "react-native";


export const sharedStyles = StyleSheet.create({
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btnPrimary:{

    }
});

export const colors = {
    primary:'#E4017E',
    'primary-disabled': '#DBC6D1',
    secondary:'grey',
    danger:'#CC2A2A',
    accent:'#1B316B',
    light:'#CFCFE2',
    fb:'#4267B2'
}