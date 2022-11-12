import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import SvgBlood from '../../svgs/SvgBlood';
import SvgCalendar from '../../svgs/SvgCalendar';
import { api } from '../../services/api';
import { ScrollView } from 'react-native-gesture-handler';

type UserProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodType: string;
}

type DonationProps = {
  quantity: string;
  createdAt: string;
}

export default function Profile() {
  const [user, setUser] = useState<UserProps>();
  const [donation, setDonation] = useState<DonationProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await api.get('/user-detail');

          setUser(response.data);
        }
        catch (error) {
          console.log(error);
        }
      })();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await api.get('/donation/user');

          setDonation(response.data);
        }
        catch (error) {
          console.log(error);
        }
      })();
    }, [])
  );

  function dateFormat(date: any) {
    const newDate = new Date(date);
    let formattDate = newDate.getDate().toString().padStart(2,"0") + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear();
    
    return formattDate;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.overview}>
        <View style={styles.profilePhoto}>
          <Image style={styles.photo} source={require('../../assets/profile.png')} />
        </View>
        <View style={styles.profileData}>
          <Text style={styles.nameTitle}>{user?.name}</Text>
          <View style={styles.areaEmail}>
            <Text style={styles.titleEmail}>E-mail</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
          <View style={styles.areaInstitution}>
            <Text style={styles.titleInstitution}>Instituição</Text>
            <Text style={styles.institution}>Hospital Universitário de Vassouras</Text>
          </View>
          <View style={styles.areaPhone}>
            <Text style={styles.titlePhone}>Telefone</Text>
            <Text style={styles.phone}>{user?.phone}</Text>
          </View>
          <View style={styles.areaTypeBlood}>
            <View />
            <TouchableOpacity style={styles.buttonProfile}>
              <Text style={styles.titleEdit}>Editar perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.areaData}>
        <View style={styles.donations}>
          <View style={styles.icon}>
            <SvgBlood />
          </View>
          <View>
            <Text style={styles.description}>Tipo sanguíneo</Text>
            {user?.bloodType === 'APositivo' && 
              <Text style={styles.nameTypeBlood}>A+</Text>
            }
            {user?.bloodType === 'BPositivo' && 
              <Text style={styles.nameTypeBlood}>B+</Text>
            }
            {user?.bloodType === 'ABPositivo' && 
              <Text style={styles.nameTypeBlood}>AB+</Text>
            }
            {user?.bloodType === 'ANegativo' && 
              <Text style={styles.nameTypeBlood}>A-</Text>
            }
            {user?.bloodType === 'BNegativo' && 
              <Text style={styles.nameTypeBlood}>B-</Text>
            }
            {user?.bloodType === 'ABNegativo' && 
              <Text style={styles.nameTypeBlood}>AB-</Text>
            }
            {user?.bloodType === 'OPositivo' && 
              <Text style={styles.nameTypeBlood}>O+</Text>
            }
            {user?.bloodType === 'ONegativo' && 
              <Text style={styles.nameTypeBlood}>O-</Text>
            }
          </View>
        </View>
        <View style={styles.dateNextDonation}>
          <View style={styles.icon}>
            <SvgCalendar />
          </View>
          <View>
            <Text style={styles.description}>Próxima doação</Text>
            <Text style={styles.title}>120 dias</Text>
          </View>
        </View>
      </View>

      <Text style={styles.titleDonation}>Suas doações</Text>

      <View style={styles.areaDonations}>
        {donation?.map((donation, index) => (
          <View style={styles.donation} key={index}>
            <View style={styles.areaIcon}>
              <SvgBlood />
            </View>
            <View style={styles.areaQuantity}>
              <View style={styles.areaInformation}>
                <Text style={styles.descriptionDonation}>{donation?.quantity} ml</Text>
              </View>
              <Text style={styles.description}>{dateFormat(donation?.createdAt)}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  overview: {
    backgroundColor: "#FFFFFF",
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    height: 290,
  },
  profileData: {
    marginTop: 20,
    marginLeft: 20,
  },
  profilePhoto: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  photo: {
    width: 150,
    height: 270,
    borderRadius: 10,
  },
  nameTitle: {
    fontSize: 20,
    maxWidth: 210,
    fontWeight: 'bold',
    color: '#3A9C7F',
    marginBottom: 10,
  },
  areaEmail: {
    marginBottom: 20,
  },
  email: {
    maxWidth: 210,
    color: '#3A9C7F'
  },
  areaPhone: {
    marginBottom: 20,
  },
  phone: {
    color: '#3A9C7F'
  },
  areaInstitution: {
    marginBottom: 20,
  },
  institution: {
    maxWidth: 210,
    color: '#3A9C7F'
  },
  titleEmail: {
    fontSize: 12,
    color: '#929292',
  },
  titleInstitution: {
    fontSize: 12,
    color: '#929292',
  },
  titlePhone: {
    fontSize: 12,
    color: '#929292',
  },
  areaTypeBlood: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  typeBlood: {
    backgroundColor: '#3A9C7F',
    padding: 10,
    borderRadius: 20,
  },
  nameTypeBlood: {
    color: '#3A9C7F',
    fontSize: 20,
    fontWeight: 'bold',
  },
  areaData: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  donations: {
    backgroundColor: "#FFFFFF",
    height: 110,
    width: 175,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  dateNextDonation: {
    backgroundColor: "#FFFFFF",
    height: 110,
    width: 175,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: '#3A9C7F',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    color: '#929292',
  },
  titleEdit: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: 'bold',
  },
  buttonProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3A9C7F',
    width: 100,
    height: 30,
    borderRadius: 10,
  },
  iconDonation: {
    width: 35,
    height: 35,
    marginRight: 10,
    paddingLeft: 10,
  },
  donationsTwo: {
    backgroundColor: "#FFFFFF",
    height: 110,
    width: 175,
    marginRight: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 15,
  },
  areaDonations: {
    width: '100%',
    marginTop: 20,
  },
  areaIcon: {
    backgroundColor: '#FFF',
    width: 50,
    height: 20,
    marginLeft: 20,
  },
  areaQuantity: {
    backgroundColor: '#FFF',
  },
  donation: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 100,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  titleDonation: {
    fontSize: 25,
    marginTop: 30,
    fontWeight: 'bold',
    color: '#3A9C7F',
    marginLeft: 20,
  },
  descriptionDonation: {
    fontSize: 20,
    color: '#3A9C7F',
    fontWeight: 'bold',
  },
  areaInformation: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})