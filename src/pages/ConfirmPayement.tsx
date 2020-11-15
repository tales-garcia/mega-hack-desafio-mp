import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';
import LinearGradient from 'react-native-linear-gradient';
import Voice, { SpeechResultsEvent } from '@react-native-community/voice';

const ConfirmPayement = () => {
  const { goBack, navigate } = useNavigation();
  const params = useRoute().params as { title: string, price: number, accessibilityActivated: boolean };

  useEffect(() => {
    if(params.accessibilityActivated)
      askConfirmation();
  }, []);

  Voice.onSpeechResults = speechResults;
  let result = '';
  let timeout: NodeJS.Timeout;
  let speechFinished = false;

  function speechResults(e: SpeechResultsEvent) {
    if (!e.value)
      return;

    e.value = e.value.map(string => string.toLowerCase());

    if (result !== e.value.join(' ')) {
      result = e.value.join(' ');
    }

    clearTimeout(timeout);
    timeout = setTimeout(endSpeech, 1500);
  }

  async function askConfirmation() {
    Speech.speak(`Você confirma o pagamento de ${params.price} reais para ${params.title}?`, {
      language: 'pt-BR'
    });
    setTimeout(startSpeech, 5000);
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

  async function startSpeech() {
    speechFinished = false;

    await Voice.destroy().then(Voice.removeAllListeners).catch(e => {
      setTimeout(startSpeech, 3000);
    });
    if(await Voice.isAvailable()) {
      await Voice.start('pt-BR');
    }
  }

  function handleResult(result: string) {
    const possiblePositiveAnwsers = [
      'sim',
      'confirmar',
      'aceitar',
      'pagar',
      'continuar'
    ]
    const possibleNegativeAwnsers = [
      'negar',
      'não',
      'cancelar'
    ]

    const words = result.split(' ');

    const booleanGuessArray = words.reduce((total, word, index, self) => {

      if (index === 0) {
        if (self.length === 2) {
          if (possiblePositiveAnwsers.includes(word)) {
            total[0][0] = true;
          } else if (possibleNegativeAwnsers.includes(word)) {
            total[1][0] = true;
          }
        } else {
          if (possiblePositiveAnwsers.includes(word)) {
            total[0][0] = true;
            total[0][1] = true;
          } else if (possibleNegativeAwnsers.includes(word)) {
            total[1][0] = true;
            total[1][1] = true;
          }
        }
      } else if (index === 1) {
        if (possiblePositiveAnwsers.includes(word)) {
          total[0][1] = true;
        } else if (possibleNegativeAwnsers.includes(word)) {
          total[1][1] = true;
        }
      }

      return total;
    }, [[false, false], [false, false]]);

    const negativeFalses = booleanGuessArray[1].reduce((total, boolean) => {
      if (!boolean) {
        total++;
      }

      return total;
    }, 0);

    const positiveFalses = booleanGuessArray[0].reduce((total, boolean) => {
      if (!boolean) {
        total++;
      }

      return total;
    }, 0);

    let positive = false;
    let unknownWord = false;

    if (positiveFalses === 2 && negativeFalses === 2) {
      unknownWord = true;
    }
    if (positiveFalses === 1 && booleanGuessArray[0].length === 1 && negativeFalses === 1 && booleanGuessArray[1].length === 1) {
      unknownWord = true;
    }
    if (positiveFalses === 2 && negativeFalses === 0) {
      positive = false;
    }
    if (positiveFalses === 0 && negativeFalses === 2) {
      positive = true;
    }
    if (positiveFalses === 0 && negativeFalses === 1) {
      positive = true;
    }
    if (positiveFalses === 1 && negativeFalses === 0) {
      positive = false;
    }

    if (unknownWord) {
      return;
    }

    if (positive) {
      confirm();
    } else if (!positive) {
      navigate('main');
    }
  }

  function confirm() {
    navigate('success', params);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topContent}>
          <Feather onPress={goBack} name="arrow-left" color="#fff" size={28} />
        </View>
        <View style={styles.mainContentHeader}>
          <View style={styles.roundedView}>
            <Feather name="shopping-bag" color="#009EE3" size={35} />
          </View>
          <Text style={{ ...styles.boldText, fontSize: 22, marginTop: 5 }}>{params.title}</Text>
        </View>
        <View style={styles.bottomContent}>
          <Text style={styles.normalText}>Total a pagar</Text>
          <Text style={styles.boldText}>R$ {params.price}</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.blackTextContainer}>
          <Text style={styles.blackText}>1x R$ 5</Text>
        </View>
        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#0030AC', '#1a6ced']} style={styles.card} >
          <Text style={styles.visa}>Visa</Text>
          <Text style={styles.cardNumber}>**** **** **** 0000</Text>
          <View style={styles.ownerInfo}>
            <Text style={{ ...styles.normalText, fontSize: 16, letterSpacing: 2 }}>TALES P GARCIA</Text>
            <Text style={{ ...styles.normalText, fontSize: 16, letterSpacing: 2 }}>6/21</Text>
          </View>
        </LinearGradient>
        <RectButton onPress={confirm} style={styles.payButton}><Text style={styles.payText}>Pagar</Text></RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#FAFAFA'
  },
  header: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 15,
    backgroundColor: '#009EE3',
    flexDirection: 'column',
    alignItems: 'center'
  },
  topContent: {
    width: '100%',
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  mainContentHeader: {
    paddingTop: 5,
    paddingBottom: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContent: {
    width: '100%',
    borderTopWidth: 0.5,
    borderTopColor: '#008ac7',
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  normalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '300'
  },
  boldText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700'
  },
  roundedView: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  blackTextContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 22
  },
  blackText: {
    fontSize: 17,
    fontWeight: '500'
  },
  card: {
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 25,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  visa: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '800',
    marginBottom: 50
  },
  cardNumber: {
    fontWeight: '300',
    color: '#fff',
    fontSize: 22,
    marginBottom: 15,
    alignSelf: 'center',
    letterSpacing: 4
  },
  ownerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%'
  },
  payText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 20
  },
  payButton: {
    backgroundColor: '#009EE3',
    borderRadius: 4,
    width: '100%',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
});

export default ConfirmPayement;