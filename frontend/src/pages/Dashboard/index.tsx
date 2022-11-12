import React, { memo, useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet } from "react-native";
import SvgDoctor from "../../svgs/SvgDoctor";
import SvgHospital from "../../svgs/SvgHospital";
import SvgNotification from "../../svgs/SvgNotification";
import SvgBlood from "../../svgs/SvgBlood";
import SvgUser from "../../svgs/SvgUser";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import SvgBigNotification from "../../svgs/SvgBigNotification";
import { api } from '../../services/api';

interface INotificationsProps {
  id: string;
  type: string;
  description: string;
}

const Dash = memo(() => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const [notificationsData, setNotificationsData] = useState<INotificationsProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await api.get('/notifications');

          setNotificationsData(response.data);
        }
        catch (error) {
          console.log(error);
        }
      })();
    }, [])
  );

  function openModal() {
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.areaItem}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Perfil' as never)}
          style={styles.item}
        >
          <View style={styles.icon}>
            <SvgUser />
          </View>
          <Text style={styles.primaryTitle}>Perfil</Text>
          <Text style={styles.description}>Acesse seu perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Conquistas' as never)}
          style={styles.item}
        >
          <View style={styles.icon}>
            <SvgBlood />
          </View>
          <Text style={styles.primaryTitle}>Conquistas</Text>
          <Text style={styles.description}>Veja suas conquistas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.areaItem}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Local de doação' as never)}
          style={styles.item}
        >
          <View style={styles.icon}>
            <SvgHospital />
          </View>
          <Text style={styles.primaryTitle}>Locais de Doação</Text>
          <Text style={styles.description}>Veja os locais mais próximos de doação</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => openModal()}
        >
          <View style={styles.icon}>
            <SvgNotification />
          </View>
          <Text style={styles.primaryTitle}>Notificações</Text>
          <Text style={styles.description}>Veja suas notificações para se manter informado</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.information}>
          <View style={styles.svg}>
            <SvgDoctor />
          </View>
          <Text style={styles.secondTitle}>Doe e ganhe conquistas</Text>
        </View>
        <View style={styles.information}>
          <View style={styles.svg}>
            <SvgDoctor />
          </View>
          <Text style={styles.secondTitle}>Salve vidas</Text>
        </View>
      </ScrollView>
      <Modal style={styles.modal} visible={modalVisible}>
        <View style={styles.areaModal}>
          <TouchableOpacity style={styles.back} onPress={() => setModalVisible(false)}>
            <Image source={require('../../assets/seta-esquerda.png')} style={styles.arrow} />
          </TouchableOpacity>
          <View style={styles.areaNotification}>
            {notificationsData.map((notification, index) => (
              <View style={styles.notification} key={index}>
                <View style={styles.areaIcon}>
                  <SvgBigNotification />
                </View>
                <View style={styles.areaContent}>
                  <Text style={styles.textNotification}>{notification.type}</Text>
                  <Text style={styles.descriptionNotification}>{notification.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
});
export default Dash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20
  },
  item: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    width: 180,
    marginRight: 10,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#fafafa',
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryTitle: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 25,
    marginLeft: 15,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#ABA4AC',
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 5,
  },
  areaItem: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "center",
  },
  information: {
    width: 280,
    height: 130,
    marginRight: 15,
    borderRadius: 15,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: '#3A9C7F',
    marginTop: 20,
    marginLeft: 5,
  },
  svg: {
    position: "absolute",
    bottom: 0,
    left: 15,
    marginTop: 15,
  },
  secondTitle: {
    fontSize: 20,
    lineHeight: 25,
    color: "#FFFFFF",
    marginRight: 15,
    textAlign: "center",
    fontWeight: "bold",
    maxWidth: 200,
  },
  modal: {
    flex: 1,
  },
  areaModal: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  areaNotification: {
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notification: {
    width: 340,
    height: 100,
    borderColor: "#3A9C7F",
    borderWidth: 2,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  back: {
    margin: 20,
  },
  areaIcon: {
    marginLeft: 25,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  areaContent: {

  },
  textNotification: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A9C7F",
    marginBottom: 5,
  },
  descriptionNotification: {
    fontSize: 14,
    maxWidth: 230,
  },
  arrow: {
    width: 30,
    height: 30,
  }
});
