import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';

export const StoreContext = createContext<{
  duckbroodBackgroundMusic: boolean;
  setDuckbroodBackgroundMusic: (value: boolean) => void;
  duckbroodVibration: boolean;
  setDuckbroodVibration: (value: boolean) => void;
  duckbroodEggs: number;
  setDuckbroodEggs: (value: number) => void;
  duckbroodUnlockedDuckIds: string[];
  setDuckbroodUnlockedDuckIds: (value: string[]) => void;
  duckbroodActiveDuckId: string;
  setDuckbroodActiveDuckId: (value: string) => void;
  duckbroodCaughtStats: Record<string, number>;
  setDuckbroodCaughtStats: (value: Record<string, number>) => void;
}>({
  duckbroodBackgroundMusic: false,
  setDuckbroodBackgroundMusic: () => {},
  duckbroodVibration: false,
  setDuckbroodVibration: () => {},
  duckbroodEggs: 0,
  setDuckbroodEggs: () => {},
  duckbroodUnlockedDuckIds: ['classic', 'cream', 'mint'],
  setDuckbroodUnlockedDuckIds: () => {},
  duckbroodActiveDuckId: 'classic',
  setDuckbroodActiveDuckId: () => {},
  duckbroodCaughtStats: {
    classic: 0,
    cream: 0,
    mint: 0,
    spotted: 0,
    sleepy: 0,
    hat: 0,
  },
  setDuckbroodCaughtStats: () => {},
});

export const useStore = () => {
  return useContext(StoreContext);
};

const DUCKBROOD_EGGS_KEY = 'duckbrood_eggs_total';
const DUCKBROOD_CAUGHT_STATS_KEY = 'duckbrood_caught_stats';
const DUCKBROOD_UNLOCKED_DUCKS_KEY = 'duckbrood_unlocked_ducks';
const DUCKBROOD_ACTIVE_DUCK_KEY = 'duckbrood_active_duck';

export const SettingsProvider = ({children}: {children: React.ReactNode}) => {
  const [duckbroodBackgroundMusic, setDuckbroodBackgroundMusic] =
    useState(false);
  const [duckbroodVibration, setDuckbroodVibration] = useState(false);
  const [duckbroodEggs, setDuckbroodEggs] = useState(0);
  const [isEggsHydrated, setIsEggsHydrated] = useState(false);
  const [duckbroodUnlockedDuckIds, setDuckbroodUnlockedDuckIds] = useState<
    string[]
  >(['classic', 'cream', 'mint']);
  const [duckbroodActiveDuckId, setDuckbroodActiveDuckId] = useState('classic');
  const [isDucksHydrated, setIsDucksHydrated] = useState(false);
  const [duckbroodCaughtStats, setDuckbroodCaughtStats] = useState<
    Record<string, number>
  >({
    classic: 0,
    cream: 0,
    mint: 0,
    spotted: 0,
    sleepy: 0,
    hat: 0,
  });
  const [isStatsHydrated, setIsStatsHydrated] = useState(false);

  useEffect(() => {
    const loadEggs = async () => {
      try {
        const storedEggs = await AsyncStorage.getItem(DUCKBROOD_EGGS_KEY);

        if (storedEggs !== null) {
          const parsedEggs = Number(storedEggs);

          if (!Number.isNaN(parsedEggs)) {
            setDuckbroodEggs(parsedEggs);
          }
        }
      } finally {
        setIsEggsHydrated(true);
      }
    };

    loadEggs();
  }, []);

  useEffect(() => {
    if (!isEggsHydrated) {
      return;
    }

    AsyncStorage.setItem(DUCKBROOD_EGGS_KEY, String(duckbroodEggs)).catch(
      () => {},
    );
  }, [duckbroodEggs, isEggsHydrated]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const rawStats = await AsyncStorage.getItem(DUCKBROOD_CAUGHT_STATS_KEY);
        if (!rawStats) {
          return;
        }

        const parsed = JSON.parse(rawStats) as Record<string, number>;
        if (parsed && typeof parsed === 'object') {
          setDuckbroodCaughtStats(prev => ({
            ...prev,
            ...parsed,
          }));
        }
      } catch (error) {
        // Ignore invalid local data.
      } finally {
        setIsStatsHydrated(true);
      }
    };

    loadStats();
  }, []);

  useEffect(() => {
    if (!isStatsHydrated) {
      return;
    }

    AsyncStorage.setItem(
      DUCKBROOD_CAUGHT_STATS_KEY,
      JSON.stringify(duckbroodCaughtStats),
    ).catch(() => {});
  }, [duckbroodCaughtStats, isStatsHydrated]);

  useEffect(() => {
    const loadDucks = async () => {
      try {
        const [rawUnlocked, rawActive] = await Promise.all([
          AsyncStorage.getItem(DUCKBROOD_UNLOCKED_DUCKS_KEY),
          AsyncStorage.getItem(DUCKBROOD_ACTIVE_DUCK_KEY),
        ]);

        if (rawUnlocked) {
          const parsedUnlocked = JSON.parse(rawUnlocked) as string[];
          if (Array.isArray(parsedUnlocked) && parsedUnlocked.length > 0) {
            setDuckbroodUnlockedDuckIds(parsedUnlocked);
          }
        }

        if (rawActive) {
          setDuckbroodActiveDuckId(rawActive);
        }
      } catch (error) {
        // Ignore invalid local data.
      } finally {
        setIsDucksHydrated(true);
      }
    };

    loadDucks();
  }, []);

  useEffect(() => {
    if (!isDucksHydrated) {
      return;
    }

    AsyncStorage.setItem(
      DUCKBROOD_UNLOCKED_DUCKS_KEY,
      JSON.stringify(duckbroodUnlockedDuckIds),
    ).catch(() => {});
  }, [duckbroodUnlockedDuckIds, isDucksHydrated]);

  useEffect(() => {
    if (!isDucksHydrated) {
      return;
    }

    AsyncStorage.setItem(DUCKBROOD_ACTIVE_DUCK_KEY, duckbroodActiveDuckId).catch(
      () => {},
    );
  }, [duckbroodActiveDuckId, isDucksHydrated]);

  const contextValues = {
    duckbroodBackgroundMusic,
    setDuckbroodBackgroundMusic,
    duckbroodVibration,
    setDuckbroodVibration,
    duckbroodEggs,
    setDuckbroodEggs,
    duckbroodUnlockedDuckIds,
    setDuckbroodUnlockedDuckIds,
    duckbroodActiveDuckId,
    setDuckbroodActiveDuckId,
    duckbroodCaughtStats,
    setDuckbroodCaughtStats,
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};
