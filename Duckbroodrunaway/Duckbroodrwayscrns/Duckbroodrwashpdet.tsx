import {useNavigation, useRoute} from '@react-navigation/native';
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
import {duckShopItems} from '../Duckbroodrwaycmpntts/duckbroodDucks';
import Duckbroodrwaylay from '../Duckbroodrwaycmpntts/Duckbroodrwaylay';
import {useStore} from '../Duckbroodrwaystre/duckbroodcnttx';

const Duckbroodrwashpdet: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const shakeValue = React.useRef(new Animated.Value(0)).current;
  const shakeAnimRef = React.useRef<{stop: () => void} | null>(null);

  React.useEffect(() => {
    return () => {
      shakeAnimRef.current?.stop();
    };
  }, []);

  React.useEffect(() => {
    const id = shakeValue.addListener(({value}) => {
      console.log('shakeValue', value);
    });

    return () => shakeValue.removeListener(id);
  }, [shakeValue]);

  const {
    duckbroodEggs,
    setDuckbroodEggs,
    duckbroodUnlockedDuckIds,
    setDuckbroodUnlockedDuckIds,
    duckbroodActiveDuckId,
    setDuckbroodActiveDuckId,
  } = useStore();

  const duckId = (route.params as {duckId?: string})?.duckId ?? 'classic';
  const item =
    duckShopItems.find(duck => duck.id === duckId) ?? duckShopItems[0];
  const isUnlocked = duckbroodUnlockedDuckIds.includes(item.id);
  const isActive = duckbroodActiveDuckId === item.id;

  const shakeButton = () => {
    shakeAnimRef.current?.stop();
    shakeValue.setValue(0);
    const anim = Animated.sequence([
      Animated.timing(shakeValue, {
        toValue: 1,
        duration: 65,
        useNativeDriver: true,
      }),
      Animated.timing(shakeValue, {
        toValue: -1,
        duration: 65,
        useNativeDriver: true,
      }),
      Animated.timing(shakeValue, {
        toValue: 1,
        duration: 65,
        useNativeDriver: true,
      }),
      Animated.timing(shakeValue, {
        toValue: 0,
        duration: 65,
        useNativeDriver: true,
      }),
    ]);
    shakeAnimRef.current = anim;
    anim.start(({finished}) => {
      if (finished) {
        shakeAnimRef.current = null;
      }
    });
  };

  const handleTradePress = () => {
    if (isUnlocked) {
      setDuckbroodActiveDuckId(item.id);
      return;
    }

    if (duckbroodEggs < item.price) {
      shakeButton();
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

        <Image source={item.image} style={styles.mainDuckImage} />

        <LinearGradient
          colors={['#FEFBCB', '#FEE43B']}
          style={styles.infoGradient}>
          <View style={styles.infoCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.points}>
              +{item.points} Point{item.points > 1 ? 's' : ''}
            </Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </LinearGradient>

        {!isUnlocked ? (
          <View style={styles.priceRow}>
            <Image source={require('../../elements/images/duckbrheggs.png')} />
            <Text style={styles.priceText}>- {item.price}</Text>
          </View>
        ) : null}

        <TouchableOpacity activeOpacity={0.9} onPress={handleTradePress}>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: shakeValue.interpolate({
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
    </Duckbroodrwaylay>
  );
};

export default Duckbroodrwashpdet;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingBottom: 20,
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  mainDuckImage: {
    width: 210,
    height: 210,
    resizeMode: 'contain',
    marginBottom: 15,
    marginTop: 20,
  },
  infoCard: {
    borderRadius: 24,
    backgroundColor: '#293977',
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    margin: 4,
  },
  infoGradient: {
    borderRadius: 30,
    width: '90%',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 18,
  },
  points: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',

    marginBottom: 18,
  },
  description: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
  },
  priceRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  priceText: {
    color: '#157707',
    fontWeight: '800',
    fontSize: 42,
    transform: [{scaleX: 0.5}, {scaleY: 0.5}],
  },
  tradeButton: {
    marginTop: 18,
    width: 160,
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tradeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 24,
  },
});
