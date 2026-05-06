import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Duckbroodrwaylay from '../Duckbroodrwaycmpntts/Duckbroodrwaylay';
import {useStore} from '../Duckbroodrwaystre/duckbroodcnttx';

type PuzzleCard = {
  id: string;
  price: number;
  parts: number[];
  full: number;
  chick: number;
};

const puzzleCards: PuzzleCard[] = [
  {
    id: 'puzzle_1',
    price: 0,
    parts: [
      require('../../elements/images/duckbrhlpuzz1.png'),
      require('../../elements/images/duckbrhlpuzz2.png'),
      require('../../elements/images/duckbrhlpuzz3.png'),
      require('../../elements/images/duckbrhlpuzz4.png'),
    ],
    full: require('../../elements/images/duckbrhlpuzzful.png'),
    chick: require('../../elements/images/duckbrhmchk.png'),
  },
  {
    id: 'puzzle_2',
    price: 0,
    parts: [
      require('../../elements/images/duckbrhlpuzz2.1.png'),
      require('../../elements/images/duckbrhlpuzz2.2.png'),
      require('../../elements/images/duckbrhlpuzz2.3.png'),
      require('../../elements/images/duckbrhlpuzz2.4.png'),
    ],
    full: require('../../elements/images/duckbrhlpuzzful2.png'),
    chick: require('../../elements/images/duckbrhmchk.png'),
  },
  {
    id: 'puzzle_3',
    price: 300,
    parts: [
      require('../../elements/images/duckbrhlpuzz3.1.png'),
      require('../../elements/images/duckbrhlpuzz3.2.png'),
      require('../../elements/images/duckbrhlpuzz3.3.png'),
      require('../../elements/images/duckbrhlpuzz3.4.png'),
    ],
    full: require('../../elements/images/duckbrhlpuzzful3.png'),
    chick: require('../../elements/images/duckbrhmchk.png'),
  },
  {
    id: 'puzzle_4',
    price: 400,
    parts: [
      require('../../elements/images/duckbrhlpuzz4.1.png'),
      require('../../elements/images/duckbrhlpuzz4.2.png'),
      require('../../elements/images/duckbrhlpuzz4.3.png'),
      require('../../elements/images/duckbrhlpuzz4.4.png'),
    ],
    full: require('../../elements/images/duckbrhlpuzzful4.png'),
    chick: require('../../elements/images/duckbrhmchk.png'),
  },
  {
    id: 'puzzle_5',
    price: 500,
    parts: [
      require('../../elements/images/duckbrhlpuzz5.1.png'),
      require('../../elements/images/duckbrhlpuzz5.2.png'),
      require('../../elements/images/duckbrhlpuzz5.3.png'),
      require('../../elements/images/duckbrhlpuzz5.4.png'),
    ],
    full: require('../../elements/images/duckbrhlpuzzful5.png'),
    chick: require('../../elements/images/duckbrhmchk.png'),
  },
  {
    id: 'puzzle_6',
    price: 600,
    parts: [
      require('../../elements/images/duckbrhlpuzz6.1.png'),
      require('../../elements/images/duckbrhlpuzz6.2.png'),
      require('../../elements/images/duckbrhlpuzz6.3.png'),
      require('../../elements/images/duckbrhlpuzz6.4.png'),
    ],
    full: require('../../elements/images/duckbrhlpuzzful6.png'),
    chick: require('../../elements/images/duckbrhmchk.png'),
  },
];

const Duckbroodrwapzzl: React.FC = () => {
  const navigation = useNavigation<any>();
  const {duckbroodEggs, setDuckbroodEggs} = useStore();
  const [unlockedIds, setUnlockedIds] = useState<string[]>([
    'puzzle_1',
    'puzzle_2',
  ]);
  const shakeRef = useRef<Record<string, Animated.Value>>({});
  const shakeAnimRef = useRef<Record<string, {stop: () => void} | null>>({});

  const getShake = (id: string) => {
    if (!shakeRef.current[id]) {
      shakeRef.current[id] = new Animated.Value(0);
    }
    return shakeRef.current[id];
  };

  useEffect(() => {
    return () => {
      Object.values(shakeAnimRef.current).forEach(a => a?.stop());
      shakeAnimRef.current = {};
    };
  }, []);

  React.useEffect(() => {
    Object.values(shakeRef.current).forEach(value => {
      const id = value.addListener(({value}) => {
        console.log('shakeValue', value);
      });

      return () => value.removeListener(id);
    });
  }, []);

  const shakeTrade = (id: string) => {
    const value = getShake(id);
    shakeAnimRef.current[id]?.stop();
    value.setValue(0);
    const anim = Animated.sequence([
      Animated.timing(value, {toValue: 1, duration: 65, useNativeDriver: true}),
      Animated.timing(value, {
        toValue: -1,
        duration: 65,
        useNativeDriver: true,
      }),
      Animated.timing(value, {toValue: 1, duration: 65, useNativeDriver: true}),
      Animated.timing(value, {toValue: 0, duration: 65, useNativeDriver: true}),
    ]);
    shakeAnimRef.current[id] = anim;
    anim.start(({finished}) => {
      if (finished) {
        shakeAnimRef.current[id] = null;
      }
    });
  };

  const handleOpenPuzzle = (item: PuzzleCard) => {
    const isUnlocked = unlockedIds.includes(item.id);
    if (isUnlocked) {
      navigation.navigate('Duckbroodrwapzzldet', {
        puzzleId: item.id,
        parts: item.parts,
        full: item.full,
        chick: item.chick,
      });
      return;
    }

    if (duckbroodEggs < item.price) {
      shakeTrade(item.id);
      return;
    }

    setDuckbroodEggs(duckbroodEggs - item.price);
    setUnlockedIds(prev => [...prev, item.id]);
    navigation.navigate('Duckbroodrwapzzldet', {
      puzzleId: item.id,
      parts: item.parts,
      full: item.full,
      chick: item.chick,
    });
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

        <ScrollView
          style={styles.gridList}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}>
          {puzzleCards.map(item => {
            const isUnlocked = unlockedIds.includes(item.id);
            return (
              <View key={item.id} style={styles.cardWrap}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => handleOpenPuzzle(item)}>
                  <LinearGradient
                    colors={['#E7DF3F', '#FFF97E']}
                    style={styles.previewCard}>
                    <View style={{padding: 10, gap: 3, alignItems: 'center'}}>
                      <View style={styles.previewImageWrap}>
                        <Image source={item.full} style={styles.previewImage} />
                        {isUnlocked ? (
                          <View style={styles.previewGridOverlay}>
                            <View style={styles.previewGridLineV} />
                            <View style={styles.previewGridLineH} />
                          </View>
                        ) : null}
                      </View>

                      {!isUnlocked ? (
                        <View style={styles.priceRow}>
                          <Image
                            source={require('../../elements/images/duckbrheggs.png')}
                          />
                          <Text style={styles.priceText}>- {item.price}</Text>
                        </View>
                      ) : null}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                {!isUnlocked ? (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleOpenPuzzle(item)}>
                    <Animated.View
                      style={[
                        styles.tradeAnimWrap,
                        {
                          transform: [
                            {
                              translateX: getShake(item.id).interpolate({
                                inputRange: [-1, 1],
                                outputRange: [-8, 8],
                              }),
                            },
                          ],
                        },
                      ]}>
                      <LinearGradient
                        colors={['#4DB240', '#66D357']}
                        style={styles.tradeButton}>
                        <Text style={styles.tradeText}>Trade</Text>
                      </LinearGradient>
                    </Animated.View>
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Duckbroodrwaylay>
  );
};

export default Duckbroodrwapzzl;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 55,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 24,
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
  gridList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  gridContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  cardWrap: {
    width: '48%',
    marginBottom: 24,
  },
  previewCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    minHeight: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImageWrap: {
    width: 118,
    height: 118,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  previewImage: {
    width: 118,
    height: 118,
    resizeMode: 'cover',
  },
  previewGridOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewGridLineV: {
    position: 'absolute',
    width: 2,
    height: '100%',
    backgroundColor: '#DDE15F',
  },
  previewGridLineH: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#DDE15F',
  },
  priceRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  priceText: {
    color: '#157707',
    fontWeight: '700',
    fontSize: 16,
  },
  tradeAnimWrap: {
    marginTop: 8,
  },
  tradeButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#157707',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tradeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 24,
  },
});
