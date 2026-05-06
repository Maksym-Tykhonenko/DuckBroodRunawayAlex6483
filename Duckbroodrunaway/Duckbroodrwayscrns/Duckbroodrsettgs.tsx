import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {duckShopItems} from '../Duckbroodrwaycmpntts/duckbroodDucks';
import Duckbroodrwaylay from '../Duckbroodrwaycmpntts/Duckbroodrwaylay';
import {useStore} from '../Duckbroodrwaystre/duckbroodcnttx';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Duckbroodrsettgs: React.FC = () => {
  const navigation = useNavigation();
  const {
    duckbroodVibration,
    setDuckbroodVibration,
    duckbroodBackgroundMusic,
    setDuckbroodBackgroundMusic,
    duckbroodCaughtStats,
  } = useStore();

  const hasRealStats = useMemo(
    () => Object.values(duckbroodCaughtStats).some(value => value > 0),
    [duckbroodCaughtStats],
  );

  const demoStats = useMemo(() => {
    const result: Record<string, number> = {};
    duckShopItems.forEach(item => {
      result[item.id] = Math.floor(Math.random() * 31) + 20;
    });
    return result;
  }, []);

  const shownStats = hasRealStats ? duckbroodCaughtStats : demoStats;

  const handleShareApp = async () => {
    Linking.openURL(
      'https://apps.apple.com/us/app/chlckenbrood-runway/id6761096696',
    );
  };

  const duckbroodToggleBackgroundMusic = async (selectedValue: boolean) => {
    try {
      await AsyncStorage.setItem(
        'toggleDuckbroodBackgroundMusic',
        JSON.stringify(selectedValue),
      );
      setDuckbroodBackgroundMusic(selectedValue);
    } catch (error) {
      console.log('Error background music', error);
    }
  };

  const duckbroodToggleVibration = async (selectedValue: boolean) => {
    try {
      await AsyncStorage.setItem(
        'toggleDuckbroodVibration',
        JSON.stringify(selectedValue),
      );
      setDuckbroodVibration(selectedValue);
    } catch (error) {
      console.log('Error vibration', error);
    }
  };

  return (
    <Duckbroodrwaylay>
      <View style={styles.screen}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}>
          <LinearGradient
            colors={['#4DB240', '#66D357']}
            style={styles.backButton}>
            <Image source={require('../../elements/images/duckbrhsback.png')} />
          </LinearGradient>
        </TouchableOpacity>

        <LinearGradient
          colors={['#E7DF3F', '#FFF97E']}
          style={styles.settingsCard}>
          <View style={{padding: 20}}>
            <View
              style={[
                styles.settingsRow,
                {marginBottom: Platform.OS === 'ios' ? 10 : 0},
              ]}>
              <Text style={styles.settingsLabel}>Vibration</Text>
              <TouchableOpacity
                onPress={() => duckbroodToggleVibration(!duckbroodVibration)}>
                {duckbroodVibration ? (
                  <Image
                    source={require('../../elements/images/duckbrhlisonswtch.png')}
                  />
                ) : (
                  <Image
                    source={require('../../elements/images/duckbrhlisoffswtch.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
            {Platform.OS === 'ios' && (
              <>
                <View style={styles.divider} />
                <View style={[styles.settingsRow, {marginTop: 10}]}>
                  <Text style={styles.settingsLabel}>Music</Text>

                  <TouchableOpacity
                    onPress={() =>
                      duckbroodToggleBackgroundMusic(!duckbroodBackgroundMusic)
                    }>
                    {duckbroodBackgroundMusic ? (
                      <Image
                        source={require('../../elements/images/duckbrhlisonswtch.png')}
                      />
                    ) : (
                      <Image
                        source={require('../../elements/images/duckbrhlisoffswtch.png')}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['#E7DF3F', '#FFF97E']}
          style={styles.statsCard}>
          <View style={{padding: 20}}>
            <Text style={styles.statsTitle}>Ducks caught for all time:</Text>
            <View style={styles.statsGrid}>
              {duckShopItems.map(item => (
                <View key={item.id} style={styles.statCell}>
                  <Image source={item.image} style={styles.statDuckImage} />
                  <Text style={styles.statText}>
                    x{shownStats[item.id] ?? 0}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>

        {Platform.OS === 'ios' && (
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableOpacity activeOpacity={0.9} onPress={handleShareApp}>
              <LinearGradient
                colors={['#FEE43B', '#FEA33B']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.shareButton}>
                <Text style={styles.shareText}>Share the app</Text>
                <Image
                  source={require('../../elements/images/duckbrhsgmshr.png')}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Duckbroodrwaylay>
  );
};

export default Duckbroodrsettgs;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  backButton: {
    width: 70,
    height: 70,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingsCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    marginBottom: 14,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsLabel: {
    color: '#157707',
    fontSize: 18,
    fontWeight: '500',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#15770766',
  },
  statsCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
  },
  statsTitle: {
    color: '#157707',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  statCell: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
  },
  statDuckImage: {
    width: 54,
    height: 54,
    resizeMode: 'contain',
  },
  statText: {
    color: '#157707',
    fontWeight: '800',
    fontSize: 20,
  },
  shareButton: {
    marginBottom: 22,
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E3851A',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
    marginTop: 20,
  },
  shareText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
