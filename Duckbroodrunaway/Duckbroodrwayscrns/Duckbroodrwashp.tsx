import {useNavigation} from '@react-navigation/native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Duckbroodrwaylay from '../Duckbroodrwaycmpntts/Duckbroodrwaylay';
import {
  DuckShopItem,
  duckShopItems,
} from '../Duckbroodrwaycmpntts/duckbroodDucks';
import {useStore} from '../Duckbroodrwaystre/duckbroodcnttx';

const Duckbroodrwashp: React.FC = () => {
  const navigation = useNavigation<any>();
  const shakeValuesRef = React.useRef<Record<string, Animated.Value>>({});
  const shakeAnimRef = React.useRef<Record<string, {stop: () => void} | null>>(
    {},
  );
  const {
    duckbroodEggs,
    setDuckbroodEggs,
    duckbroodUnlockedDuckIds,
    setDuckbroodUnlockedDuckIds,
    duckbroodActiveDuckId,
    setDuckbroodActiveDuckId,
  } = useStore();

  const getShakeValue = (id: string) => {
    if (!shakeValuesRef.current[id]) {
      shakeValuesRef.current[id] = new Animated.Value(0);
    }

    return shakeValuesRef.current[id];
  };

  React.useEffect(() => {
    return () => {
      Object.values(shakeAnimRef.current).forEach(a => a?.stop());
      shakeAnimRef.current = {};
    };
  }, []);

  React.useEffect(() => {
    Object.values(shakeValuesRef.current).forEach(value => {
      const id = value.addListener(({value}) => {
        console.log('shakeValue', value);
      });
      return () => value.removeListener(id);
    });
  }, []);

  const shakeLockedButton = (id: string) => {
    const value = getShakeValue(id);
    shakeAnimRef.current[id]?.stop();
    value.setValue(0);

    const anim = Animated.sequence([
      Animated.timing(value, {
        toValue: 1,
        duration: 65,
        useNativeDriver: true,
      }),
      Animated.timing(value, {
        toValue: -1,
        duration: 65,
        useNativeDriver: true,
      }),
      Animated.timing(value, {
        toValue: 1,
        duration: 65,
        useNativeDriver: true,
      }),
      Animated.timing(value, {
        toValue: 0,
        duration: 65,
        useNativeDriver: true,
      }),
    ]);
    shakeAnimRef.current[id] = anim;
    anim.start(({finished}) => {
      if (finished) {
        shakeAnimRef.current[id] = null;
      }
    });
  };

  const handleTradePress = (item: DuckShopItem) => {
    const isUnlocked = duckbroodUnlockedDuckIds.includes(item.id);

    if (isUnlocked) {
      setDuckbroodActiveDuckId(item.id);
      return;
    }

    if (duckbroodEggs < item.price) {
      shakeLockedButton(item.id);
      return;
    }

    setDuckbroodEggs(duckbroodEggs - item.price);
    setDuckbroodUnlockedDuckIds([...duckbroodUnlockedDuckIds, item.id]);
    setDuckbroodActiveDuckId(item.id);
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

        <View style={styles.listContent}>
          {duckShopItems.map(item => {
            const isUnlocked = duckbroodUnlockedDuckIds.includes(item.id);
            const isActive = duckbroodActiveDuckId === item.id;

            return (
              <View key={item.id} style={styles.card}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    navigation.navigate(
                      'Duckbroodrwashpdet' as never,
                      {duckId: item.id} as never,
                    )
                  }>
                  <LinearGradient
                    colors={['#E7DF3F', '#FFF97E']}
                    style={styles.previewBox}>
                    <Image source={item.image} style={styles.duckImage} />
                    {!isUnlocked && (
                      <View style={styles.priceRow}>
                        <Image
                          source={require('../../elements/images/duckbrheggs.png')}
                        />
                        <Text style={styles.priceText}>{item.price}</Text>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => handleTradePress(item)}>
                  <Animated.View
                    style={{
                      transform: [
                        {
                          translateX: getShakeValue(item.id).interpolate({
                            inputRange: [-1, 1],
                            outputRange: [-8, 8],
                          }),
                        },
                      ],
                    }}>
                    <LinearGradient
                      colors={['#4DB240', '#66D357']}
                      style={styles.tradeButton}>
                      <Text style={styles.tradeButtonText}>
                        {isActive ? 'Used' : isUnlocked ? 'Use' : 'Trade'}
                      </Text>
                    </LinearGradient>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </Duckbroodrwaylay>
  );
};

export default Duckbroodrwashp;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 55,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 24,
  },
  priceText: {
    fontSize: 16,
    color: '#0E6A2A',
    fontWeight: '800',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'center',
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
  list: {
    flex: 1,
    marginTop: 10,
  },
  listContent: {
    gap: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  card: {
    borderRadius: 24,
    width: '48%',
    marginBottom: 17,
  },
  previewBox: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    height: 165,
    gap: 8,
  },
  duckImage: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
  tradeButton: {
    height: 52,
    borderWidth: 1,
    borderColor: '#157707',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tradeButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
});
