import React from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import statisticsIcon from '../images/statistics.png';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.topContent}>
            <View>
              <Text style={styles.smallText}>Olá Tales</Text>
              <Text style={styles.mediumText}>Nível 30 - Mercado Pontos <FontAwesome size={12} name="chevron-right"/></Text>
            </View>
            <View>
              <Feather name="bell" color="#fff" size={25} />
            </View>
          </View>
          <View style={styles.headerMainContent}>
            <View style={{...styles.headerItem, borderBottomColor: '#1AADED', borderBottomWidth: 1}}>
              <Text style={styles.largeText}>R$ 0</Text>
              <FontAwesome name="chevron-right" color="#fff" size={12}/>
            </View>
            <View style={{...styles.headerItem, borderBottomColor: '#1AADED', borderBottomWidth: 1}}>
              <View style={styles.itemText}>
                <Image source={statisticsIcon} style={{ marginRight: 10 }} />
                <Text style={{...styles.smallText, maxWidth: 156}}>Ganhe mais do que com a poupança</Text>
              </View>
              <FontAwesome name="chevron-right" color="#fff" size={12}/>
            </View>
            <View style={styles.headerItem}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#0030AC', '#005BEB']} style={styles.card}>
                <Text style={styles.smallText}>Visa</Text>
                <Text style={styles.cardNumber}>**** **** **** 0000</Text>
              </LinearGradient>
              <FontAwesome name="chevron-right" color="#fff" size={12}/>
            </View>
            <View style={styles.headerArrowUpContainer}>
              <View style={styles.arrowUpSphere}>
                <FontAwesome style={{ marginTop: -2 }} name="chevron-up" color="#fff" size={10}/>
              </View>
            </View>
          </View>
        </View>
        <View>

        </View>
        <View>

        </View>
      </SafeAreaView>
    </>
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
    position: 'absolute',
    top: 0,
    paddingVertical: 22,
    paddingHorizontal: 20
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
  }
});

export default App;
