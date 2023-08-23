import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/header';
import styles from './styles';
import colors from '../../utils/color';
import TrashIcon from '../../assets/trash.svg';
import ArrowIcon from '../../assets/arrow.svg';
import {useDispatch} from 'react-redux';
import {addGuest, deleteGuest} from '../../redux/guestSlice';
import {useRoute} from '@react-navigation/native';

export default function AddGuest({navigation}) {
  const [form, setForm] = useState([]);
  const dispatch = useDispatch();
  const route = useRoute();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  function makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  useEffect(() => {
    route.params.params.map(e => {
      setForm(current => [
        ...current,
        {id: e.id, nama: e.nama, panggilan: e.panggilan},
      ]);
    });
  }, []);

  const navigateBack = () => {
    dispatch(deleteGuest());
    form.map(e => {
      dispatch(addGuest({id: e.id, nama: e.nama, panggilan: e.panggilan}));
    });
    navigation.goBack();
  };

  const changeName = (e, index) => {
    form[index].nama = e;
    setForm([...form]);
  };

  const changePanggilan = (e, index) => {
    form[index].panggilan = e;
    setForm([...form]);
  };

  const removePeople = id => {
    setForm(form.filter(e => e.id !== id));
  };

  const renderItem = (item, index) => {
    return (
      <View style={styles.wrapperItem}>
        <View style={styles.pressModal}>
          <Pressable
            onPress={() => {
              setActiveIndex(index);
              setShowModal(true);
            }}
            style={styles.buttonShowModal}>
            <Text
              style={[
                styles.txtTittleStepper,
                {fontWeight: 'bold', fontSize: 12},
              ]}>
              {item.panggilan}
            </Text>
            <View style={{ position : 'absolute' , right : 5 }}>
              <ArrowIcon width={14} height={14} />
            </View>
          </Pressable>
        </View>
        <TextInput
          value={item.nama}
          onChangeText={e => changeName(e, index)}
          style={styles.textInput}
        />
        <Pressable
          onPress={() => removePeople(item.id)}
          style={styles.buttonDelete}>
          <TrashIcon width={25} height={25} />
        </Pressable>
      </View>
    );
  };

  const addForm = () => {
    setForm(form.concat({id: makeid(15), nama: '', panggilan: ''}));
  };

  const renderModal = () => {
    return (
      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View style={styles.containerModal}>
          <View style={styles.wrapperContentModal}>
            <View>
              <Text style={[styles.txtTittleStepper, {fontWeight: 'bold'}]}>
                Pilih Panggilan
              </Text>
            </View>
            <Pressable
              onPress={() => {
                changePanggilan('MR', activeIndex);
                setShowModal(false);
              }}
              style={styles.buttonModal}>
              <Text
                style={[
                  styles.txtTittleStepper,
                  {fontWeight: 'bold', fontSize: 14},
                ]}>
                MR
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                changePanggilan('MS', activeIndex);
                setShowModal(false);
              }}
              style={styles.buttonModal}>
              <Text
                style={[
                  styles.txtTittleStepper,
                  {fontWeight: 'bold', fontSize: 14},
                ]}>
                MS
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header title={'Tambah Data Tamu'} />

        <View style={styles.wrapper}>
          <Text style={[styles.txtTittleStepper, {fontWeight: 'bold'}]}>
            Data Tamu
          </Text>

          <FlatList
            data={form}
            renderItem={({item, index}) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
              <Pressable onPress={addForm} style={styles.wrapperButtonAdd}>
                <Text style={styles.textButtonAdd}>+ Tambah Data Tamu</Text>
              </Pressable>
            }
          />

          <Pressable onPress={navigateBack} style={styles.wrapperButton}>
            <Text style={[styles.txtTittleStepper, styles.txtSimpan]}>
              Simpan
            </Text>
          </Pressable>
        </View>

        {renderModal()}
      </View>
    </SafeAreaView>
  );
}
