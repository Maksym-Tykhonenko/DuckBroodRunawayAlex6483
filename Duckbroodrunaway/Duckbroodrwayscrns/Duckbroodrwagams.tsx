import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import {duckShopItems} from '../Duckbroodrwaycmpntts/duckbroodDucks';
import Duckbroodrwaylay from '../Duckbroodrwaycmpntts/Duckbroodrwaylay';
import {useStore} from '../Duckbroodrwaystre/duckbroodcnttx';
import Orientation from 'react-native-orientation-locker';

type CoopPosition = {
  top: `${number}%`;
  left: `${number}%`;
};

const coopPositions: CoopPosition[] = [
  {top: '35%', left: '53%'},
  {top: '48%', left: '14%'},
  {top: '62%', left: '53%'},
  {top: '76%', left: '10%'},
  {top: '76%', left: '56%'},
];
const GAME_START_DELAY_MS = 2000;
const CHICK_VISIBLE_MS = 1200;
const Duckbroodrwagams: React.FC = () => {
  const navigation = useNavigation();
  const {
    duckbroodEggs,
    setDuckbroodEggs,
    duckbroodActiveDuckId,
    duckbroodCaughtStats,
    setDuckbroodCaughtStats,
    duckbroodVibration,
  } = useStore();
  const activeDuck =
    duckShopItems.find(item => item.id === duckbroodActiveDuckId) ??
    duckShopItems[0];
  const scorePerTap = activeDuck.points;

  const [duckbroodScore, setDuckbroodScore] = useState(0);
  const [activeCoopIndex, setActiveCoopIndex] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [plusOneIndex, setPlusOneIndex] = useState<number | null>(null);

  const roundTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextRoundTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const plusOneTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAllTimeouts = useCallback(() => {
    if (roundTimeoutRef.current) {
      clearTimeout(roundTimeoutRef.current);
      roundTimeoutRef.current = null;
    }
    if (nextRoundTimeoutRef.current) {
      clearTimeout(nextRoundTimeoutRef.current);
      nextRoundTimeoutRef.current = null;
    }
    if (plusOneTimeoutRef.current) {
      clearTimeout(plusOneTimeoutRef.current);
      plusOneTimeoutRef.current = null;
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  const startNextRound = useCallback(() => {
    if (isGameOver) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * coopPositions.length);
    setActiveCoopIndex(randomIndex);

    roundTimeoutRef.current = setTimeout(() => {
      setActiveCoopIndex(null);
      setIsGameOver(true);
    }, CHICK_VISIBLE_MS);
  }, [isGameOver]);

  useEffect(() => {
    nextRoundTimeoutRef.current = setTimeout(() => {
      startNextRound();
    }, GAME_START_DELAY_MS);

    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts, startNextRound]);

  useEffect(() => {
    if (isGameOver && duckbroodVibration) {
      Vibration.vibrate(220);
    }
  }, [duckbroodVibration, isGameOver]);

  const handleChickTap = useCallback(
    (index: number) => {
      if (isGameOver || index !== activeCoopIndex) {
        return;
      }

      if (roundTimeoutRef.current) {
        clearTimeout(roundTimeoutRef.current);
        roundTimeoutRef.current = null;
      }

      setDuckbroodScore(prev => prev + scorePerTap);
      setDuckbroodEggs(duckbroodEggs + 1);
      setDuckbroodCaughtStats({
        ...duckbroodCaughtStats,
        [duckbroodActiveDuckId]:
          (duckbroodCaughtStats[duckbroodActiveDuckId] ?? 0) + 1,
      });
      setPlusOneIndex(index);
      setActiveCoopIndex(null);

      plusOneTimeoutRef.current = setTimeout(() => {
        setPlusOneIndex(null);
      }, 700);

      nextRoundTimeoutRef.current = setTimeout(() => {
        startNextRound();
      }, 420);
    },
    [
      activeCoopIndex,
      duckbroodEggs,
      duckbroodCaughtStats,
      duckbroodActiveDuckId,
      scorePerTap,
      isGameOver,
      setDuckbroodEggs,
      setDuckbroodCaughtStats,
      startNextRound,
    ],
  );

  const handleRestart = () => {
    clearAllTimeouts();
    setDuckbroodScore(0);
    setIsGameOver(false);
    setActiveCoopIndex(null);
    setPlusOneIndex(null);

    nextRoundTimeoutRef.current = setTimeout(() => {
      startNextRound();
    }, 280);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `DuckBrood Runaway score: ${duckbroodScore}`,
      });
    } catch (error) {
      // Ignore native share cancellation/errors.
    }
  };

  const coopNodes = useMemo(
    () =>
      coopPositions.map((position, index) => {
        const showChick = index === activeCoopIndex && !isGameOver;
        const showPlusOne = index === plusOneIndex;

        return (
          <View
            key={`coop-${index}`}
            style={[styles.coopWrap, {top: position.top, left: position.left}]}>
            <Image
              style={styles.coopImage}
              source={require('../../elements/images/duckbrhfield.png')}
            />

            {showChick ? (
              <TouchableOpacity
                style={styles.chickTapArea}
                activeOpacity={0.9}
                onPress={() => handleChickTap(index)}>
                <Image source={activeDuck.image} style={styles.chickImage} />
              </TouchableOpacity>
            ) : null}

            {showPlusOne ? (
              <View style={styles.plusOneBadge}>
                <Text style={styles.plusOneText}>+{scorePerTap}</Text>
                <Image
                  source={require('../../elements/images/duckbrheggs.png')}
                />
              </View>
            ) : null}
          </View>
        );
      }),
    [
      activeCoopIndex,
      activeDuck.image,
      handleChickTap,
      isGameOver,
      plusOneIndex,
      scorePerTap,
    ],
  );

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

        <Text style={styles.scoreText}>Score:{duckbroodScore}</Text>
        {coopNodes}

        {isGameOver ? (
          <View style={styles.gameOverOverlay}>
            <Image
              source={require('../../elements/images/duckbrhsgmover.png')}
            />
            <Text style={styles.gameOverScore}>Score:{duckbroodScore}</Text>

            <TouchableOpacity activeOpacity={0.88} onPress={handleShare}>
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

            <TouchableOpacity activeOpacity={0.88} onPress={handleRestart}>
              <LinearGradient
                colors={['#4DB240', '#66D357']}
                style={styles.mainButton}>
                <Text style={styles.mainButtonText}>Restart</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => navigation.goBack()}>
              <LinearGradient
                colors={['#4DB240', '#66D357']}
                style={styles.mainButton}>
                <Text style={styles.mainButtonText}>Main menu</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </Duckbroodrwaylay>
  );
};

export default Duckbroodrwagams;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 46,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  backButtonText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '900',
    marginTop: -2,
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
  scoreText: {
    marginTop: 26,
    textAlign: 'center',
    color: '#157707',
    fontWeight: '800',
    fontSize: 32,
  },
  coopWrap: {
    position: 'absolute',
    width: 170,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coopImage: {
    width: 158,
    height: 70,
  },
  chickTapArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chickImage: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
  plusOneBadge: {
    position: 'absolute',
    top: -38,
    left: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  plusOneText: {
    fontSize: 34,
    fontWeight: '900',
    color: '#0C8D2A',
    transform: [{scaleX: 0.5}, {scaleY: 0.5}],
  },
  gameOverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000CC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  gameOverTitle: {
    color: '#FFD640',
    fontSize: 88,
    fontWeight: '900',
    transform: [{scaleX: 0.5}, {scaleY: 0.5}],
    marginBottom: 2,
  },
  gameOverScore: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 38,
    marginTop: 50,
  },
  shareButton: {
    width: 155,
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E3851A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 54,
    flexDirection: 'row',
    gap: 5,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  mainButton: {
    width: 230,
    height: 76,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#157707',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
});
