import React from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import statisticsIcon from '../../images/statistics.png';
import chargeIcon from '../../images/charge.png';
import pay from '../../images/pay.png';
import money from '../../images/money.png';
import moneyWhite from '../../images/moneyWhite.png';
import qrCode from '../../images/qr-code.png';
import payWhite from '../../images/payWhite.png';
import receive from '../../images/receive.png';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Voice, { SpeechResultsEvent } from '@react-native-community/voice';

const Main = () => {
  const { navigate } = useNavigation();

  Voice.onSpeechResults = onSpeechResult;

  Voice.start('pt-BR')

  let result = '';
  let timeout: NodeJS.Timeout;
  let speechFinished = false;

  function onSpeechResult(e: SpeechResultsEvent) {
    if (!e.value)
      return;

    e.value = e.value.map(string => string.toLowerCase());

    if (result !== e.value.join(' ')) {
      result = e.value.join(' ');
    }
    clearTimeout(timeout);
    timeout = setTimeout(endSpeech, 1500);
  }

  async function endSpeech() {
    if (speechFinished) {
      return;
    }

    speechFinished = true;

    handleResult(result);

    await Voice.stop();
    setTimeout(startSpeech, 3000);
  }

  async function handleResult(result: string) {
    const initialPossibleWords = [
      'ler',
      'pagar',
      'abrir',
      'escanear'
    ];
    const secondPossibleWords = [
      'com',
      'por',
      'usando',
      'via'
    ];
    const thirdPossibleWords = [
      'código',
      'qr'
    ];
    const finalPossibleWords = [
      'qr',
      'code',
      'câmera'
    ];

    const splitted = result.split(' ');

    const booleanGuessArray = splitted.reduce((total, word, index, self) => {
      switch (index) {
        case 0: {

          if (initialPossibleWords.includes(word)) {
            total[0] = true
          }

          break;
        }
        case 1: {

          if (self.length === 2) {
            if (finalPossibleWords.includes(word)) {
              total[1] = true
            }
          } else if (self.length === 3) {
            if (thirdPossibleWords.includes(word)) {
              total[1] = true
            }
          }
          else if (self.length === 4) {
            if (secondPossibleWords.includes(word)) {
              total[1] = true
            }
          }
          break;
        }
        case 2: {

          if (self.length === 3) {
            if (finalPossibleWords.includes(word)) {
              total[2] = true
            }
          }
          else if (self.length === 4) {
            if (thirdPossibleWords.includes(word)) {
              total[2] = true
            }
          }

          break;
        }
        case 3: {

          if (finalPossibleWords.includes(word)) {
            total[3] = true
          }
          break;
        }
      }
      return total;
    }, [false, false]);
    const falses = booleanGuessArray.reduce((total, boolean) => {
      if (!boolean) {
        total++;
      }
      return total
    }, 0);
    if (falses === 4) {
      return;
    }
    if (falses === 3 && booleanGuessArray.length === 3) {
      return;
    }
    if (falses === 2 && booleanGuessArray.length === 2) {
      return;
    }
    if (falses === 2 && booleanGuessArray.length === 3) {
      return;
    }
    if (falses === 3 && booleanGuessArray.length === 4) {
      return;
    }
    if (falses === 2 && booleanGuessArray.length === 4) {
      return;
    }
    await Voice.cancel();
    navigate('scan', { accessibilityActivated: true });
  }

  async function startSpeech() {
    await Voice.start('pt-BR');
    speechFinished = false;
  }

  return (
    <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, position: 'relative' }}>
      <View style={styles.header}>
        <View style={styles.topContent}>
          <View>
            <Text style={styles.smallText}>Olá Tales</Text>
            <Text style={styles.mediumText}>Nível 30 - Mercado Pontos <FontAwesome size={12} name="chevron-right" /></Text>
          </View>
          <View>
            <Feather name="bell" color="#fff" size={25} />
          </View>
        </View>
        <View style={styles.headerMainContent}>
          <View style={{ ...styles.headerItem, borderBottomColor: '#1AADED', borderBottomWidth: 1 }}>
            <Text style={styles.largeText}>R$ 0</Text>
            <FontAwesome name="chevron-right" color="#fff" size={12} />
          </View>
          <View style={{ ...styles.headerItem, borderBottomColor: '#1AADED', borderBottomWidth: 1 }}>
            <View style={styles.itemText}>
              <Image source={statisticsIcon} style={{ marginRight: 10 }} />
              <Text style={{ ...styles.smallText, maxWidth: 156 }}>Ganhe mais do que com a poupança</Text>
            </View>
            <FontAwesome name="chevron-right" color="#fff" size={12} />
          </View>
          <View style={styles.headerItem}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#0030AC', '#1a6ced']} style={styles.card}>
              <Text style={styles.smallText}>Visa</Text>
              <Text style={styles.cardNumber}>**** **** **** 0000</Text>
            </LinearGradient>
            <FontAwesome name="chevron-right" color="#fff" size={12} />
          </View>
          <View style={styles.headerArrowUpContainer}>
            <View style={styles.arrowUpSphere}>
              <FontAwesome style={{ marginTop: -2 }} name="chevron-up" color="#fff" size={10} />
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.actionsContainer}>
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <RectButton onPress={() => navigate('scan', { accessibilityActivated: false })} style={styles.actionSphere}>
              <Image style={{ marginTop: -2 }} source={qrCode} />
            </RectButton>
            <Text style={styles.actionText}>Código QR</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <View style={styles.actionSphere}>
              <Image style={{ marginTop: -2 }} source={receive} />
            </View>
            <Text style={styles.actionText}>Adicionar dinheiro</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <View style={styles.actionSphere}>
              <Image style={{ marginTop: -2 }} source={payWhite} />
            </View>
            <Text style={styles.actionText}>Transferir dinheiro</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <View style={styles.actionSphere}>
              <Image style={{ marginTop: -2 }} source={moneyWhite} />
            </View>
            <Text style={styles.actionText}>Sacar dinheiro</Text>
          </View>
        </View>
        <View style={styles.mainItem}>
          <Text style={styles.normalCardText}>Use o dinheiro da sua conta para comprar pela internet com o Cartão Mercado Pago</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Feather name="home" color="#009EE3" size={20} />
          <Text style={{ ...styles.tabText, color: '#009EE3' }}>Início</Text>
        </View>
        <View style={styles.footerItem}>
          <Image source={money} />
          <Text style={styles.tabText}>Seu dinheiro</Text>
        </View>
        <View style={styles.footerItem}>
          <Image source={pay} />
          <Text style={styles.tabText}>Pagar</Text>
        </View>
        <View style={styles.footerItem}>
          <Image source={chargeIcon} />
          <Text style={styles.tabText}>Cobrar</Text>
        </View>
        <View style={styles.footerItem}>
          <Feather name="home" color="#898989" size={20} />
          <Text style={styles.tabText}>Mais</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#009EE3',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 20,
    zIndex: 20
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  smallText: {
    color: '#fff',
    fontSize: 13
  },
  mediumText: {
    color: '#fff',
    fontSize: 17
  },
  headerMainContent: {
    width: '100%',
    marginTop: 15,
    flexDirection: 'column'
  },
  largeText: {
    color: '#fff',
    fontSize: 25
  },
  headerItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 65
  },
  itemText: {
    flexDirection: 'row'
  },
  cardNumber: {
    color: '#fff',
    fontSize: 13
  },
  card: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 4,
    flexDirection: 'row',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerArrowUpContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  arrowUpSphere: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#1AADED',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    width: Dimensions.get('window').width,
    backgroundColor: '#FAFAFA',
    height: 55,
    borderTopColor: '#898989',
    borderTopWidth: 0.5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 20
  },
  footerItem: {
    alignItems: 'center'
  },
  tabText: {
    color: '#898989'
  },
  mainContainer: {
    paddingHorizontal: 30,
    width: Dimensions.get('window').width,
    marginTop: -8,
    zIndex: 10,
    backgroundColor: '#EFEFEF',
    position: 'relative',
    paddingTop: 28,
    paddingBottom: 10
  },
  mainItem: {
    borderRadius: 3,
    backgroundColor: '#FAFAFA',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  normalCardText: {
    color: '#424242',
    fontSize: 13
  },
  actionsContainer: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },
  actionSphere: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#009EE3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionText: {
    color: '#424242',
    fontSize: 13,
    maxWidth: 60,
    marginTop: 5,
    textAlign: 'center'
  }
});

export default Main;
