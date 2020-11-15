import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import QRCodeScanner, { Event } from 'react-native-qrcode-scanner';
import * as Speech from 'expo-speech';

function ScanQRCode() {
  const [flash, setFlash] = useState(false);
  const scanner = useRef<QRCodeScanner>(null);
  const { accessibilityActivated } = useRoute().params as { accessibilityActivated: boolean };

  const { goBack, navigate } = useNavigation();
  scanner.current?.reactivate();

  useEffect(() => {
    if(accessibilityActivated)
      Speech.speak('Aponte a câmera para o código QR', { language: 'pt-BR' });
  }, []);

  function onRead(ev: Event) {

    const parsedData = ev.data.split(':');
    if (parsedData.length > 2 || parsedData.length < 2) {
      alert('O código QR escaneado não é válido');
      return;
    }

    parsedData[1] = parsedData[1].replace('.', ',');
    scanner.current?.disable();

    navigate('confirm', {
      title: parsedData[0],
      price: parsedData[1],
      accessibilityActivated
    });
  }

  return (
    <View>
      <View style={styles.header}>
        <Feather color="#fff" size={25} onPress={goBack} name="arrow-left" />
        <Text style={styles.title}>Pagar com código QR</Text>
        <Feather color="#fff" size={25} name="help-circle" />
      </View>
      <QRCodeScanner
        ref={scanner}
        reactivate={true}
        reactivateTimeout={5000}
        onRead={onRead}
        cameraProps={{ flashMode: flash ? 'torch' : 'off' }}
        cameraStyle={styles.camera}
        bottomContent={(
          <View style={styles.bottomContainer}>
            <RectButton onPress={() => setFlash(!flash)} style={styles.roundedButton}>
              <Feather name="sun" color="#898989" size={25} />
            </RectButton>
            <RectButton style={styles.button}>
              <Text style={styles.text}><Feather name="map" color="#fff" size={25} />{'   '}Ver lojas com código QR</Text>
            </RectButton>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: Dimensions.get('window').height
  },
  header: {
    backgroundColor: '#009EE3',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 28,
    paddingBottom: 10
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700'
  },
  button: {
    backgroundColor: '#009EE3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 4,
    width: '90%'
  },
  bottomContainer: {
    marginBottom: -320,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    flexDirection: 'column',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '300'
  },
  roundedButton: {
    backgroundColor: '#fff',
    opacity: 0.5,
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ScanQRCode;