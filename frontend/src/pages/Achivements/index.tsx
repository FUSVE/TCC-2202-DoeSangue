import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { api } from '../../services/api';

interface IAchivementsProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  userAchivementsId?: null;
  achieved?: boolean;
}

export default function Achivements() {

  const [achivementData, setAchivementData] = useState<IAchivementsProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await api.get('/achivements');
          setAchivementData(response.data);
        }
        catch (error) {
          console.log(error);
        }
      })();
    }, [])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.title}>Todas as conquistas</Text>

      <View style={styles.achivements}>
        {achivementData?.map((achivements, index) => (
            <View style={{display: 'flex',
            height: 120,
            backgroundColor: "#FFF",
            elevation: 3,
            marginTop: 20,
            flexDirection: 'row',
            borderRadius: 10,
            opacity: achivements.achieved ? 1 : 0.3}} key={index}>
              <View>
                {achivements.icon && <Image style={styles.imageAchivement} source={{uri: achivements.icon}} />}
              </View>
              <View style={styles.dataAchivement}>
                <Text style={styles.nameAchivement}>{achivements.name}</Text>
                <Text style={styles.descriptionAchivement}>{achivements.description}</Text>
              </View>
            </View>
          ))
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 25,
    marginTop: 30,
    fontWeight: 'bold',
    color: '#3A9C7F',
  },
  achivements: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  achivement: {
    display: 'flex',
    height: 120,
    backgroundColor: '#FFF',
    elevation: 3,
    marginTop: 20,
    flexDirection: 'row',
    borderRadius: 10,
  },
  imageAchivement: {
    width: 100,
    height: 100,
    margin: 10,
  },
  dataAchivement: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
    marginLeft: 10,
  },
  nameAchivement: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3A9C7F',
    maxWidth: 200,
  },
  descriptionAchivement: {
    marginTop: 5,
    maxWidth: 200,
  }
})