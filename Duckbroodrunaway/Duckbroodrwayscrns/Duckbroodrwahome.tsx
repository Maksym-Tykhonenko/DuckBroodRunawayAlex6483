import React, {useCallback, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Duckbroodrwaylay from '../Duckbroodrwaycmpntts/Duckbroodrwaylay';
import {useStore} from '../Duckbroodrwaystre/duckbroodcnttx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';

const Duckbroodrwahome: React.FC = () => {
  const navigation = useNavigation<any>();
  const {
    duckbroodEggs,
    duckbroodBackgroundMusic,
    setDuckbroodBackgroundMusic,

    setDuckbroodVibration,
  } = useStore();

  const [duckbroodBackgroundMusicIdx, setDuckbroodBackgroundMusicIdx] =
    useState(0);
  const [sound, setSound] = useState<Sound | null>(null);
  const duckbroodBackgroundMusicTracksCycle = [
    'white_records-childrens-short-music-for-video-vlog-42-sec-old-macdonald-had-a-farm-188185.mp3',
    'white_records-childrens-short-music-for-video-vlog-42-sec-old-macdonald-had-a-farm-188185.mp3',
  ];

  useFocusEffect(
    useCallback(() => {
      loadDuckbroodBackgroundMusic();
      loadDuckbroodVibration();
    }, []),
  );

  useEffect(() => {
    playDuckbroodBackgroundMusic(duckbroodBackgroundMusicIdx);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [duckbroodBackgroundMusicIdx]);

  const playDuckbroodBackgroundMusic = (index: number) => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const duckbroodBackgroundMusicTrackPath =
      duckbroodBackgroundMusicTracksCycle[index];

    const newDuckbroodBackgroundMusicSound = new Sound(
      duckbroodBackgroundMusicTrackPath,

      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('Error =>', error);
          return;
        }

        newDuckbroodBackgroundMusicSound.play(success => {
          if (success) {
            setDuckbroodBackgroundMusicIdx(
              prevIndex =>
                (prevIndex + 1) % duckbroodBackgroundMusicTracksCycle.length,
            );
          } else {
            console.log('Error =>');
          }
        });
        setSound(newDuckbroodBackgroundMusicSound);
      },
    );
  };

  useEffect(() => {
    const setVolumeDuckbroodBackgroundMusic = async () => {
      try {
        const duckbroodBackgroundMusicValue = await AsyncStorage.getItem(
          'toggleDuckbroodBackgroundMusic',
        );

        const isDuckbroodBackgroundMusicOn = JSON.parse(
          duckbroodBackgroundMusicValue,
        );
        setDuckbroodBackgroundMusic(isDuckbroodBackgroundMusicOn);
        if (sound) {
          sound.setVolume(isDuckbroodBackgroundMusicOn ? 1 : 0);
        }
      } catch (error) {
        console.error('Error =>', error);
      }
    };

    setVolumeDuckbroodBackgroundMusic();
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(duckbroodBackgroundMusic ? 1 : 0);
    }
  }, [duckbroodBackgroundMusic]);

  const loadDuckbroodVibration = async () => {
    try {
      const duckbroodVibrationValue = await AsyncStorage.getItem(
        'toggleDuckbroodVibration',
      );
      if (duckbroodVibrationValue !== null) {
        const isDuckbroodVibrationOn = JSON.parse(duckbroodVibrationValue);
        setDuckbroodVibration(isDuckbroodVibrationOn);
      }
    } catch (error) {
      console.error('Error!', error);
    }
  };

  const loadDuckbroodBackgroundMusic = async () => {
    try {
      const duckbroodBackgroundMusicValue = await AsyncStorage.getItem(
        'toggleDuckbroodBackgroundMusic',
      );
      if (duckbroodBackgroundMusicValue !== null) {
        const isDuckbroodBackgroundMusicOn = JSON.parse(
          duckbroodBackgroundMusicValue,
        );
        setDuckbroodBackgroundMusic(isDuckbroodBackgroundMusicOn);
      }
    } catch (error) {
      console.error('Error loading settings =>', error);
    }
  };

  const handleQuickAction = (button: string) => {
    if (button === 'Shop') {
      navigation.navigate('Duckbroodrwashp');
      return;
    }

    if (button === 'Book') {
      navigation.navigate('Duckbroodrwastrs', {tab: 'stories'});
      return;
    }

    if (button === 'Puzzles') {
      navigation.navigate('Duckbroodrwapzzl');
      return;
    }

    navigation.navigate('Duckbroodrsettgs');
  };

  return (
    <Duckbroodrwaylay>
      <View style={styles.screen}>
        <View style={styles.topRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Duckbroodrsettgs')}>
            <LinearGradient
              colors={['#44BC52', '#6EDB5E']}
              style={styles.topLeftButton}>
              <Image
                source={require('../../elements/images/duckbrhsett.png')}
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

        <View style={styles.centerColumn}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Duckbroodrwagams' as never)}
            style={styles.wideButtonWrap}>
            <LinearGradient
              colors={['#4DB240', '#66D357']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.wideButton}>
              <Text style={styles.wideButtonText}>Start</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.smallButtonsRow}>
            {['Shop', 'Book', 'Puzzles'].map(button => (
              <TouchableOpacity
                key={button}
                activeOpacity={0.9}
                onPress={() => handleQuickAction(button)}
                style={styles.smallButtonWrap}>
                <LinearGradient
                  colors={['#44BC52', '#6EDB5E']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.smallButton}>
                  {button === 'Shop' ? (
                    <Image
                      source={require('../../elements/images/duckbrhstore.png')}
                    />
                  ) : button === 'Book' ? (
                    <Image
                      source={require('../../elements/images/duckbrhstrs.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../elements/images/duckbrhmpzz.png')}
                    />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Duckbroodrwafactgen' as never)}
            style={styles.wideButtonWrap}>
            <LinearGradient
              colors={['#44BC52', '#6EDB5E']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.wideButton}>
              <Text style={styles.wideButtonText}>Fact generator</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Image
          source={require('../../elements/images/duckbrhmchk.png')}
          style={styles.mainDuck}
        />
      </View>
    </Duckbroodrwaylay>
  );
};

export default Duckbroodrwahome;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 55,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topLeftButton: {
    width: 70,
    height: 70,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',

    justifyContent: 'center',
    alignItems: 'center',
  },
  topButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F8FFEE',
  },
  eggsPill: {
    minWidth: 110,
    height: 50,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#157707',

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  eggsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#157707',
  },
  eggsRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  centerColumn: {
    alignItems: 'center',
    gap: 14,
    marginTop: 40,
  },
  wideButtonWrap: {
    width: 230,
  },
  wideButton: {
    height: 70,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wideButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
  },
  smallButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  smallButtonWrap: {
    width: 70,
    height: 70,
  },
  smallButton: {
    width: 70,
    height: 70,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  duckImage: {
    width: '100%',
    maxWidth: 290,
    height: 230,
    alignSelf: 'center',
  },
  mainDuck: {
    alignSelf: 'center',
  },
});
