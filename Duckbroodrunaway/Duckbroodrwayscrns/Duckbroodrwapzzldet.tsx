import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
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

type PuzzleParams = {
  puzzleId: string;
  parts: number[];
  full: number;
  chick: number;
};

const Duckbroodrwapzzldet: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {duckbroodEggs} = useStore();
  const params = (route.params as PuzzleParams) ?? ({} as PuzzleParams);

  const parts = params.parts ?? [
    require('../../elements/images/duckbrhduck.png'),
    require('../../elements/images/duckbrhduck.png'),
    require('../../elements/images/duckbrhduck.png'),
    require('../../elements/images/duckbrhduck.png'),
  ];
  const chick =
    params.chick ?? require('../../elements/images/duckbrhmchk.png');

  const [order, setOrder] = useState<number[]>([0, 1, 2, 3]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const randomOrder = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    const solved = randomOrder.every((value, index) => value === index);
    setOrder(solved ? [0, 1, 3, 2] : randomOrder);
  }, [params.puzzleId]);

  const isSolved = useMemo(
    () => order.every((value, index) => value === index),
    [order],
  );

  const onTilePress = (index: number) => {
    if (isSolved) {
      return;
    }

    if (selectedIndex === null) {
      setSelectedIndex(index);
      return;
    }

    if (selectedIndex === index) {
      setSelectedIndex(null);
      return;
    }

    const nextOrder = [...order];
    const temp = nextOrder[selectedIndex];
    nextOrder[selectedIndex] = nextOrder[index];
    nextOrder[index] = temp;
    setOrder(nextOrder);
    setSelectedIndex(null);
  };

  const handleShare = async () => {
    try {
      await Share.share({message: 'I solved a duck puzzle!'});
    } catch (error) {
      // Ignore share cancellation.
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
            <View style={styles.eggsRow}>
              <Image
                source={require('../../elements/images/duckbrheggs.png')}
              />
              <Text style={styles.eggsText}>{duckbroodEggs}</Text>
            </View>
          </LinearGradient>
        </View>

        <LinearGradient
          colors={['#E7DF3F', '#FFF97E']}
          style={{
            borderRadius: 20,
            width: '100%',
            borderWidth: 1,
            borderColor: '#157707',
            marginTop: 20,
          }}>
          <View
            style={{
              gap: 8,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            {order.map((partIndex, tileIndex) => (
              <TouchableOpacity
                key={`tile_${tileIndex}`}
                activeOpacity={0.9}
                onPress={() => onTilePress(tileIndex)}
                style={[
                  styles.tileTouch,
                  selectedIndex === tileIndex && styles.tileSelected,
                ]}>
                <Image source={parts[partIndex]} style={styles.tileImage} />
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>

        <View style={{bottom: 90, alignItems: 'center'}}>
          {isSolved ? <Image source={chick} style={styles.chickImage} /> : null}

          {isSolved && (
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
          )}
        </View>
      </View>
    </Duckbroodrwaylay>
  );
};

export default Duckbroodrwapzzldet;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
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
  eggsRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  eggsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#157707',
  },
  boardWrap: {
    width: 370,
    maxWidth: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
    marginTop: 20,
  },
  tileTouch: {
    width: '48.5%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  tileSelected: {
    borderWidth: 3,
    borderColor: '#157707',
  },
  tileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  chickImage: {
    width: 220,
    height: 295,
    resizeMode: 'contain',
    marginBottom: 14,
  },
  shareButton: {
    width: 180,
    height: 58,
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
    fontSize: 20,
    fontWeight: '700',
  },
});
