import React from 'react'
import type { PropsWithChildren } from 'react'
import { Text, View, StyleSheet } from 'react-native'

type CurrencyButtonProps = PropsWithChildren<{
    flag: string,
    name: string,
    // value:number
}>

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
    return(
        <View style={styles.buttonContainer}>
            <Text style={styles.flag}>{props.flag}</Text>
            <Text style={styles.countryName}>{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        alignItems:'center'
    },
    flag:{
        fontSize:28,
        color:'#ffffff',
        marginBottom:4
    },
    countryName:{
        fontSize:14,
        color:'#2d3436',
    }
})
export default CurrencyButton