import {useNavigation} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Duckbroodrwaylay from '../Duckbroodrwaycmpntts/Duckbroodrwaylay';
import {useStore} from '../Duckbroodrwaystre/duckbroodcnttx';

const duckbroodFacts = [
  'Ducklings can recognize their mother’s voice just a few hours after hatching.',
  'Ducks have waterproof feathers thanks to a special oil they spread while grooming.',
  'Ducklings often sleep in a tight group to stay warm and feel safe.',
  'Even very young ducklings can swim instinctively without being taught.',
  'Ducks blink less often than humans but can still see clearly underwater.',
  'A group of ducklings moving together is sometimes called a brood train.',
  'Ducklings can imprint on the first moving object they see after hatching.',
  'Ducks have excellent night vision compared to many other birds.',
  'Ducklings communicate using soft peeps long before they can quack.',
  'Ducks can regulate the temperature of their feet to avoid heat loss.',
  'Ducklings often follow winding paths rather than straight ones when exploring.',
  'Ducks can sleep with one eye open to stay alert for danger.',
  'Ducklings learn routes and landmarks surprisingly quickly.',
  'Ducks have a wider field of vision than humans.',
  'Ducklings feel calmer when they hear gentle water sounds.',
  'Ducks can recognize individual members of their brood.',
  'Ducklings explore more confidently when they feel protected.',
  'Ducks have been living alongside humans for thousands of years.',
  'Ducklings naturally synchronize their movements when walking together.',
  'Ducks can float effortlessly thanks to air trapped in their feathers.',
  'Ducklings often pause to observe before changing direction.',
  'Ducks have strong legs even though they appear round and soft.',
  'Ducklings instinctively avoid deep shadows when they feel unsure.',
  'Ducks can sense vibrations in the ground through their feet.',
  'Ducklings tend to explore more during warm, calm weather.',
  'Ducks can remember safe places for a very long time.',
  'Ducklings prefer gentle slopes over steep paths.',
  'Ducks use subtle head movements to communicate with each other.',
  'Ducklings feel more confident when moving toward familiar sounds.',
  'Ducks can adjust their pace to stay together as a group.',
  'Ducklings often stop to rest even during short journeys.',
  'Ducks can detect changes in water flow with high precision.',
  'Ducklings are naturally curious but cautious at the same time.',
  'Ducks rely more on routine than randomness when moving around.',
  'Ducklings feel safest when surrounded by others of the same size.',
  'Ducks can recognize reflections but do not confuse them with real ducks.',
  'Ducklings respond positively to calm environments.',
  'Ducks use their beaks to explore objects gently.',
  'Ducklings learn faster through observation than trial and error.',
  'Ducks prefer familiar paths even when new ones look easier.',
  'Ducklings tend to pause before crossing open spaces.',
  'Ducks are excellent at maintaining balance while moving.',
  'Ducklings often follow the warmest available route.',
  'Ducks can adapt quickly to new surroundings if they feel safe.',
  'Ducklings show curiosity through small, repeated movements.',
  'Ducks rely on rhythm when walking together.',
  'Ducklings often return to places where they previously felt calm.',
  'Ducks can sense changes in light throughout the day.',
  'Ducklings instinctively avoid overcrowded areas.',
  'Ducks feel most comfortable when their environment stays predictable.',
];

const Duckbroodrwafactgen: React.FC = () => {
  const navigation = useNavigation();
  const {duckbroodEggs} = useStore();
  const [factIndex, setFactIndex] = useState(0);
  const currentFact = useMemo(() => duckbroodFacts[factIndex], [factIndex]);

  const handleGenerate = () => {
    if (duckbroodFacts.length < 2) {
      return;
    }

    let nextIndex = factIndex;
    while (nextIndex === factIndex) {
      nextIndex = Math.floor(Math.random() * duckbroodFacts.length);
    }
    setFactIndex(nextIndex);
  };

  const handleShare = async () => {
    try {
      await Share.share({message: currentFact});
    } catch (error) {
      // Ignore share cancel/errors.
    }
  };

  return (
    <Duckbroodrwaylay>
      <View style={styles.screen}>
        <View style={styles.topRow}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.goBack()}>
            <LinearGradient
              colors={['#4DB240', '#66D357']}
              style={styles.backButton}>
              <Image
                source={require('../../elements/images/duckbrhsback.png')}
              />
            </LinearGradient>
          </TouchableOpacity>

          <LinearGradient
            colors={['#E7DF3F', '#FFF97E']}
            style={styles.eggsPill}>
            <View style={styles.eggsPillInner}>
              <Image
                source={require('../../elements/images/duckbrheggs.png')}
              />
              <Text style={styles.eggsText}>{duckbroodEggs}</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.content}>
          <LinearGradient
            colors={['#FEFBCB', '#FEE43B']}
            style={{borderRadius: 30, width: '95%'}}>
            <View style={styles.factCard}>
              <Text style={styles.factText}>{currentFact}</Text>
            </View>
          </LinearGradient>

          <TouchableOpacity activeOpacity={0.9} onPress={handleGenerate}>
            <LinearGradient
              colors={['#4DB240', '#66D357']}
              style={styles.generateButton}>
              <Text style={styles.generateButtonText}>Generate one</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} onPress={handleShare}>
            <LinearGradient
              colors={['#FEE43B', '#FEA33B']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Share</Text>
              <Image
                source={require('../../elements/images/duckbrhsgmshr.png')}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Duckbroodrwaylay>
  );
};

export default Duckbroodrwafactgen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 70,
    height: 70,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#157707',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eggsPill: {
    minWidth: 112,
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eggsPillInner: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  eggsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#157707',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  factCard: {
    borderRadius: 24,
    margin: 4,
    backgroundColor: '#2E3E83',
    minHeight: 180,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  factText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 25,
  },
  generateButton: {
    width: 350,
    marginTop: 28,
    maxWidth: '100%',
    height: 70,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  generateButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 24,
  },
  shareButton: {
    width: 155,
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E3851A',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
