import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import QRCodeScanner, { Event } from 'react-native-qrcode-scanner';

function ScanQRCode() {
  const [flash, setFlash] = useState(false);

  const { goBack } = useNavigation();

  function onRead(ev: Event) {
    alert(ev.data);
  }

  return (
    <View>
      <View style={styles.header}>
        <Feather color="#fff" size={25} onPress={goBack} name="arrow-left" />
        <Text style={styles.title}>Pagar com código QR</Text>
        <Feather color="#fff" size={25} name="help-circle" />
      </View>
      <QRCodeScanner
        onRead={onRead}
        cameraProps={{flashMode: flash ? 'on' : 'off'}}
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