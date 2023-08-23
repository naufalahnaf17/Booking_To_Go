import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import colors from '../utils/color';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../assets/back.svg';

export default function Header({title}) {
  const navigation = useNavigation();

  const navigateBack = () => {
    if (title === 'Tambah Data Tamu') {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtHeader}>{title}</Text>
      <Pressable style={styles.iconBack} onPress={navigateBack}>
        <BackIcon width={18} height={18} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    backgroundColor: colors.blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtHeader: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
  },
  iconBack: {
    width: 30,
    height: 25,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 15,
  },
});
