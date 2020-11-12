import React from 'react';
import { Feather } from '@expo/vector-icons';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.topContent}>
            <View>
              <Text>Olá Tales</Text>
            </View>
            <View>
              <Feather name="bell" color="#fff" size={20} />
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
    paddingVertical: 38,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default App;
