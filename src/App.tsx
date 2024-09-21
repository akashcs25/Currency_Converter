import { FlatList, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { currencyByRupee } from './constants'
import CurrencyButton from './components/currencyButton'
import Snackbar from 'react-native-snackbar'

export default function App() {
  const [inputValue, setInputValue] = useState('')
  const [resultValue, setResultValue] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000'
      })
    }

    const inputAmount = parseFloat(inputValue)
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`
      setResultValue(result)
      setTargetCurrency(targetValue.name)
    }
    else {
      return Snackbar.show({
        text: 'not a valid number to convert',
        backgroundColor: '#F4BE2C',
        textColor: '#000000'
      })
    }
  }
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              style={styles.inputAmountField}
              maxLength={14}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder='Enter amount in rupees'
            />
          </View>
          {resultValue && (
            <Text style={styles.resultText}>
              {resultValue}
            </Text>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={2}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <Pressable
                style={[styles.button, targetCurrency === item.name && styles.selected]}
                onPress={() => buttonPressed(item)}
              >
                <CurrencyButton {...item}/>
              </Pressable>
            )}

          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#636363',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rupeesContainer: {
    flexDirection:'row',
    alignItems:'center'
  },
  rupee: {
   marginRight:8,
   fontSize:22,
   color:'#000000',
   fontWeight:'800'
  },
  resultText: {
   fontSize:32,
   color:'#000000',
   fontWeight:'800'
  },
  inputAmountField:{
    height:40,
    width:200,
    padding:8,
    borderWidth:4,
    borderRadius:4,
    backgroundColor:'black',
    color:'white'
  },
  bottomContainer: {
   flex:3
  },
  button: {
  flex:4,
  margin:12,
  height:80,
  borderRadius:12,
  backgroundColor:'#fff',
  elevation:2,
  shadowOffset:{
    width:1,
    height:1
  },
  shadowColor:'#333',
  shadowOpacity:0.1,
  shadowRadius:1,
  },
  selected: {
    backgroundColor:'#ffeaa7'
  },
});
