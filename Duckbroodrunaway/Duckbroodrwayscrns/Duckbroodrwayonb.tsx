import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const volcLertOnboardingData = [
  {
    id: 1,
    image: require('../../elements/images/duckbroon1.png'),
    title: 'A Wandering Duck Brood',
    buttonText: 'Next',
    description:
      'A small brood of ducklings loves to wander. They drift away, explore the pond, and sometimes lose their way.',
  },
  {
    id: 2,
    image: require('../../elements/images/duckbroon2.png'),
    title: 'Guide Them Back',
    buttonText: 'Next',
    description:
      'Ducklings appear and start moving away. Gently guide them back before they wander too far.',
  },
  {
    id: 3,
    image: require('../../elements/images/duckbroon3.png'),
    title: 'Gather Eggs, Unlock Ducklings',
    buttonText: 'Next',
    description:
      'Each successful return earns eggs. Use them to unlock new ducklings.',
  },
  {
    id: 4,
    image: require('../../elements/images/duckbroon4.png'),
    title: 'A Calm Place to Return',
    buttonText: 'Let’s Go',
    description:
      'Read quiet stories, take part in endless quizzes, and enjoy the game at your own pace.',
  },
];

const Duckbroodrwayonb = () => {
  const navigation = useNavigation();
  const [volcLertCurrIndex, setVolcLertCurrIndex] = useState(0);

  const volcLertHandleNext = () => {
    volcLertCurrIndex < volcLertOnboardingData.length - 1
      ? setVolcLertCurrIndex(volcLertCurrIndex + 1)
      : navigation.navigate('Duckbroodrwahome' as never);
  };

  return (
    <ImageBackground
      source={volcLertOnboardingData[volcLertCurrIndex].image}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={volcLertStyles.volcLertContainer}>
          <View>
            <LinearGradient
              colors={['#FEFBCB', '#FEE43B']}
              style={{borderRadius: 30, width: '85%'}}>
              <View
                style={{
                  backgroundColor: '#293977',
                  margin: 4,
                  padding: 20,
                  borderRadius: 25,
                }}>
                <Text style={volcLertStyles.volcLertTitle}>
                  {volcLertOnboardingData[volcLertCurrIndex].title}
                </Text>
                <Text style={volcLertStyles.volcLertDescription}>
                  {volcLertOnboardingData[volcLertCurrIndex].description}
                </Text>
              </View>
            </LinearGradient>
          </View>

          <TouchableOpacity
            style={{width: '100%'}}
            onPress={volcLertHandleNext}
            activeOpacity={0.8}>
            <LinearGradient
              colors={['#4DB240', '#66D357']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={volcLertStyles.volcLertButton}>
              <Text style={volcLertStyles.volcLertButtonText}>
                {volcLertOnboardingData[volcLertCurrIndex].buttonText}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Duckbroodrwayonb;

const volcLertStyles = StyleSheet.create({
  volcLertContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 60,
    paddingTop: 100,
  },
  volcLertButton: {
    width: 222,
    height: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#157707',
  },
  volcLertButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  volcLertTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  volcLertDescription: {
    fontSize: 15,
    fontWeight: '300',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
    lineHeight: 20,
  },
});
