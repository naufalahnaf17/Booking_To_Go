import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useMemo, useState, useEffect} from 'react';
import Header from '../../components/header';
import colors from '../../utils/color';
import styles from './styles';
import RadioGroup from 'react-native-radio-buttons-group';
import {GetDetailHotel} from '../../service/http';
import MoneyIcon from '../../assets/money.svg';
import PersonIcon from '../../assets/person.svg';

import {useSelector} from 'react-redux';

export default function PaymentDetails({navigation}) {
  const [selectedId, setSelectedId] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Saya memesan untuk sendiri',
        value: 'option1',
        borderSize: 2,
        size: 24,
        color: colors.blue,
        labelStyle: styles.labelRadio,
      },
      {
        id: '2',
        label: 'Saya memesan untuk orang lain',
        value: 'option2',
        borderSize: 2,
        size: 24,
        color: colors.blue,
        labelStyle: styles.labelRadio,
      },
    ],
    [],
  );

  const guest = useSelector(state => state.guest);

  useEffect(() => {
    getDetailHotel();
  }, []);

  const getDetailHotel = async () => {
    setIsLoading(true);
    let response = await GetDetailHotel();
    setData(response?.chosen_hotel?.data?.get_chosen_hotel ?? null);
    setIsLoading(false);
  };

  const renderItemTamu = item => {
    return (
      <View style={styles.wrapperItemTamu}>
        <PersonIcon width={20} height={20} style={styles.imgItemTamu} />
        <View style={styles.fill}>
          <Text style={[styles.txtTittleStepper, {fontWeight: 'bold'}]}>
            {item?.panggilan ?? '-'}. {item?.nama ?? '-'}
          </Text>
        </View>
      </View>
    );
  };

  const navigateToAddGuest = () => {
    navigation.navigate('AddGuest', {
      params: guest,
    });
  };

  const getNightTotal = () => {
    let date_1 = new Date('2023-08-30');
    let date_2 = new Date('2023-08-28');

    const days = (date_1, date_2) => {
      let difference = date_1.getTime() - date_2.getTime();
      let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
      return TotalDays;
    };

    return days(date_1, date_2);
  };

  const getFormattedDate = date => {
    let tanggal = new Date(date);
    let month = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    return (
      tanggal.getDate() +
      ' ' +
      month[tanggal.getMonth()] +
      ' ' +
      tanggal.getFullYear()
    );
  };

  const renderDetailPesanan = () => {
    return (
      <>
        {/* Detail Pesanan */}
        <>
          <View style={styles.padding}>
            <Text style={[styles.txtTittleStepper, {fontWeight: 'bold'}]}>
              Detail Pesanan
            </Text>
            <View style={styles.height} />
            <View style={styles.wrapperCard}>
              {data?.chosen_hotel_detail ? (
                <Image
                  source={{
                    uri: data?.chosen_hotel_detail?.images[0]?.url,
                  }}
                  style={styles.imgCard}
                />
              ) : (
                <View
                  style={[
                    styles.imgCard,
                    {backgroundColor: 'lightgrey'},
                  ]}></View>
              )}
              <View style={styles.wrapperColumnCard}>
                <Text
                  style={[
                    styles.txtCardTitle,
                    {fontWeight: 'bold', color: colors.blue},
                  ]}>
                  {data?.chosen_hotel_detail?.hotel_name ?? '-'}
                </Text>
                <Text
                  style={[
                    styles.txtCard,
                    {fontWeight: 'bold', color: colors.grey},
                  ]}>
                  {data?.chosen_hotel_room?.room_name ?? '-'}{' '}
                  {data?.chosen_hotel_room?.meal_code === '3'
                    ? 'With Breakfast'
                    : ''}
                </Text>
                <Text
                  style={[
                    styles.txtCard,
                    {fontWeight: 'bold', color: colors.grey},
                  ]}>
                  {data?.chosen_hotel_params?.total_room ?? '-'}
                  {' Kamar \u2022'}
                  {parseInt(
                    data?.chosen_hotel_params?.guest_adult +
                      data?.chosen_hotel_params?.guest_infant +
                      data?.chosen_hotel_params?.guest_children,
                  ) ?? '-'}
                  {' Tamu\u2022 '}
                  {getNightTotal() ?? '-'}
                  {' Malam'}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.paddingHorizontal, styles.contentCheckIn]}>
            <View style={styles.leftContent}>
              <Text style={styles.txtCheck}>Check-In</Text>
            </View>
            <View style={styles.rightContent}>
              <Text style={styles.txtDate}>
                {getFormattedDate(data?.chosen_hotel_params?.check_in)}
              </Text>
            </View>
          </View>

          <View style={[styles.paddingHorizontal, styles.contentCheckIn]}>
            <View style={styles.leftContent}>
              <Text style={styles.txtCheck}>Check-Out</Text>
            </View>
            <View style={styles.rightContent}>
              <Text style={styles.txtDate}>
                {getFormattedDate(data?.chosen_hotel_params?.check_out)}
              </Text>
            </View>
          </View>

          <View style={[styles.paddingHorizontal, styles.contentCheckIn]}>
            <View
              style={[
                styles.rightContent,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                },
              ]}>
              <View style={{marginEnd: 8}}>
                <MoneyIcon width={25} height={25} />
              </View>
              <Text style={styles.txtRefund}>
                {data?.chosen_hotel_prices?.cxl_policies[
                  data?.chosen_hotel_prices?.cxl_policies.length - 1
                ].cxl_remark ?? '-'}
              </Text>
            </View>
          </View>
        </>
        {/* Detail Pesanan */}
      </>
    );
  };

  const renderDetailPemesanan = () => {
    return (
      <>
        {/* Detail Pemesan */}
        <>
          <View style={styles.padding}>
            <Text style={[styles.txtTittleStepper, {fontWeight: 'bold'}]}>
              Detail Pemesan
            </Text>
            <View style={styles.height} />
            <View style={styles.wrapperCard}>
              <View style={styles.wrapperColumnCard}>
                <Text
                  style={[
                    styles.txtCardTitle,
                    {fontWeight: 'bold', color: colors.black},
                  ]}>
                  Tn. Andreas Andreas
                </Text>
                <Text
                  style={[
                    styles.txtCard,
                    {fontWeight: 'bold', color: colors.grey},
                  ]}>
                  andreasandreas@gmail.com
                </Text>
                <Text
                  style={[
                    styles.txtCard,
                    {fontWeight: 'bold', color: colors.grey},
                  ]}>
                  +628 22 222 2222
                </Text>
              </View>
              <Text style={[styles.txtCard, styles.txtUnderline]}>Ubah</Text>
            </View>
          </View>

          <RadioGroup
            containerStyle={styles.wrapperRadio}
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
          />
        </>
        {/* Detail Pemesan */}
      </>
    );
  };

  const renderDetailPemesan = () => {
    return (
      <>
        {/* Detail Pemesan */}
        <>
          <View style={styles.padding}>
            <Text style={[styles.txtTittleStepper, {fontWeight: 'bold'}]}>
              Data Tamu
            </Text>
            <View style={{height: 5}} />

            <FlatList
              data={guest}
              renderItem={({item}) => renderItemTamu(item)}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponentStyle={{alignItems: 'flex-end'}}
              ListEmptyComponent={
                <View style={styles.cardEmpty}>
                  <Text style={styles.txtEmpty}>Tamu belum ditambahkan!</Text>
                </View>
              }
              ListFooterComponent={
                <Pressable onPress={navigateToAddGuest}>
                  <View style={styles.height} />
                  <Text style={[styles.txtCard, styles.txtUnderline]}>
                    Ubah Data Tamu
                  </Text>
                </Pressable>
              }
            />
          </View>
        </>
        {/* Detail Pemesan */}
      </>
    );
  };

  const renderDetail = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.container}
        ListEmptyComponent={
          <>
            {renderDetailPesanan()}

            {/* Line */}
            <View style={styles.lineHorizontal} />
            {/* Line */}

            {renderDetailPemesanan()}

            {renderDetailPemesan()}
          </>
        }
      />
    );
  };

  const renderLoading = () => {
    return (
      <View
        style={[
          styles.container,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <ActivityIndicator color={colors.blue} size={'large'} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Header */}
        <Header title={'Payment Details'} />
        {/* Header */}

        {/* Stepper */}
        <>
          <View style={styles.wrapperStepper}>
            <View style={styles.fill} />
            <View style={styles.contentDetailPesanan}>
              <View style={styles.circleBg}>
                <Text style={styles.txtNumber}>1</Text>
              </View>
              <Text style={styles.txtTittleStepper}>Detail Pesanan</Text>
            </View>
            <View style={styles.line} />
            <View style={[styles.contentDetailPesanan, {opacity: 0.35}]}>
              <View style={styles.circleBg}>
                <Text style={styles.txtNumber}>2</Text>
              </View>
              <Text style={styles.txtTittleStepper}>Pembayaran</Text>
            </View>
          </View>
        </>
        {/* Stepper */}

        {isLoading ? renderLoading() : renderDetail()}
      </View>
    </SafeAreaView>
  );
}
