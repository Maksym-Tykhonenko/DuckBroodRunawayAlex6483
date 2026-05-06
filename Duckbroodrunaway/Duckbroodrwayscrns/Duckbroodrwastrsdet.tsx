import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
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

const Duckbroodrwastrsdet: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {duckbroodEggs} = useStore();
  const params = (route.params as {title?: string; text?: string}) ?? {};

  const title = params.title ?? 'Story';
  const text = params.text ?? 'Story text is unavailable.';

  const handleShare = async () => {
    try {
      await Share.share({message: `${title}\n\n${text}`});
    } catch (error) {
      console.log('Error sharing story', error);
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

        <LinearGradient
          colors={['#E7DF3F', '#FFF97E']}
          style={styles.storyCard}>
          <View style={{padding: 20}}>
            <Text style={styles.storyTitle}>{title}</Text>
            <Text style={styles.storyText}>{text}</Text>
          </View>
        </LinearGradient>

        <TouchableOpacity activeOpacity={0.9} onPress={handleShare}>
          <LinearGradient
            colors={['#FEE43B', '#FEA33B']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Share the story</Text>
            <Image
              source={require('../../elements/images/duckbrhsgmshr.png')}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Duckbroodrwaylay>
  );
};

export default Duckbroodrwastrsdet;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    width: 70,
    height: 70,
    borderRadius: 20,
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
  storyCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    marginBottom: 16,
  },
  storyTitle: {
    color: '#157707',
    fontWeight: '800',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
  storyText: {
    color: '#157707',
    fontSize: 13,
    textAlign: 'center',
  },
  shareButton: {
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
