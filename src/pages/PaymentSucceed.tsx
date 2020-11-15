import { Feather } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Dimensions,Image,  StyleSheet, Text, View } from 'react-native';
import qrCode from '../../images/qr-code-black.png';
import burgerKing from '../../images/burger-king-logo.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Speech from 'expo-speech';

const PaymentSucceed = () => {
  const { navigate } = useNavigation();
  const { title, price, accessibilityActivated } = useRoute().params as { title: string, price: number, accessibilityActivated: boolean };

  useEffect(() => {
    if(accessibilityActivated) {
      Speech.speak('Pagamento realizado com sucesso!', {
        language: 'pt-BR'
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topContent}>
          <Feather name="x" color="#f2f3f5" size={24} onPress={() => navigate('main')} />
        </View>
        <View style={styles.bottomContent}>
          <Text style={styles.title}>
            Pronto! você já pagou para {title}
          </Text>
          <View style={styles.roundedView}>
            <Feather name="shopping-bag" color="#1db578" size={20} />
          </View>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.info}>
          <View style={{...styles.roundedView, borderColor: '#e6e6e6', borderWidth: 1, marginRight: 10}}>
            <Text style={styles.visa}>Visa</Text>
          </View>
          <View style={styles.textsInfo}>
            <Text style={styles.money}>R$ {price}</Text>
            <Text style={styles.cardNumber}>Visa terminado em 0000</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={{...styles.roundedView, borderColor: '#e6e6e6', borderWidth: 1, marginRight: 10}}>
            <Image source={qrCode}/>
          </View>
          <View style={styles.textsInfo}>
            <Text style={styles.money}>Operação #122434566778989</Text>
            <Text style={styles.cardNumber}>42 de quinzembro de 2456 às 43:90</Text>
          </View>
        </View>
        <Text style={styles.discounts}>Descontos com código QR</Text>
        <View style={styles.grid}>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <View style={{...styles.roundedView, backgroundColor: '#e6e6e6'}}>
                <Image style={styles.logo} source={burgerKing} />
              </View>
              <View style={styles.discountText}>
                <Text style={styles.lightText}>Até</Text>
                <Text style={styles.boldText}>R$ 120</Text>
              </View>
            </View>
            <View style={styles.rowItem}>
              <View style={{...styles.roundedView, backgroundColor: '#e6e6e6'}}>
                <Image style={styles.logo} source={burgerKing} />
              </View>
              <View style={styles.discountText}>
                <Text style={styles.lightText}>Até</Text>
                <Text style={styles.boldText}>R$ 120</Text>
              </View>
            </View>
            <View style={styles.rowItem}>
              <View style={{...styles.roundedView, backgroundColor: '#e6e6e6'}}>
                <Image style={styles.logo} source={burgerKing} />
              </View>
              <View style={styles.discountText}>
                <Text style={styles.lightText}>Até</Text>
                <Text style={styles.boldText}>R$ 120</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <View style={{...styles.roundedView, backgroundColor: '#e6e6e6'}}>
                <Image style={styles.logo} source={burgerKing} />
              </View>
              <View style={styles.discountText}>
                <Text style={styles.lightText}>Até</Text>
                <Text style={styles.boldText}>R$ 120</Text>
              </View>
            </View>
            <View style={styles.rowItem}>
              <View style={{...styles.roundedView, backgroundColor: '#e6e6e6'}}>
                <Image style={styles.logo} source={burgerKing} />
              </View>
              <View style={styles.discountText}>
                <Text style={styles.lightText}>Até</Text>
                <Text style={styles.boldText}>R$ 120</Text>
              </View>
            </View>
            <View style={styles.rowItem}>
              <View style={{...styles.roundedView, backgroundColor: '#e6e6e6'}}>
                <Image style={styles.logo} source={burgerKing} />
              </View>
              <View style={styles.discountText}>
                <Text style={styles.lightText}>Até</Text>
                <Text style={styles.boldText}>R$ 120</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#f2f3f5'
  },
  header: {
    backgroundColor: '#1db578',
    paddingHorizontal: 30,
    width: Dimensions.get('window').width,
  },
  topContent: {
    paddingTop: 30,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  bottomContent: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    color: '#f2f3f5',
    fontSize: 20,
    fontWeight: '500',
    maxWidth: 200
  },
  roundedView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#f2f3f5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    paddingHorizontal: 30,
    backgroundColor: '#f2f3f5',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 14
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  visa: {
    color: '#0030AC',
    fontWeight: '700',
    fontSize: 18
  },
  textsInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  money: {
    color: '#424242',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  cardNumber: {
    color: '#898989',
    fontSize: 12
  },
  discounts: {
    color: '#424242',
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center'
  },
  grid: {
    width: '100%',
    paddingHorizontal: 30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 9
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 28
  },
  rowItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  discountText: {
    marginTop: 8,
    flexDirection: 'column',
    alignItems: 'center'
  },
  lightText: {
    color: '#898989',
    fontSize: 10,
    fontWeight: '300'
  },
  boldText: {
    color: '#424242',
    fontSize: 18,
    fontWeight: '600'
  },
  logo: {
    height: 36,
    width: 36
  }
});
export default PaymentSucceed;