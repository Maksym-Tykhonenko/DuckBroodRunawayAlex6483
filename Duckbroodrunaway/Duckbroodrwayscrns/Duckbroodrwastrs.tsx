import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Animated,
  Image,
  Share,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import Duckbroodrwaylay from '../Duckbroodrwaycmpntts/Duckbroodrwaylay';
import {useStore} from '../Duckbroodrwaystre/duckbroodcnttx';

type TabType = 'stories' | 'quiz';

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

const storyItems = [
  {
    id: 'story_1',
    title: 'Sunny and the Day He Went Too Far',
    preview:
      'Sunny had always believed that the farm was a place without borders. From the moment he hatched, he felt...',
    price: 0,
    fullText:
      'Sunny had always believed that the farm was a place without borders. From the moment he hatched, he felt that every patch of grass, every stone, and every shadow belonged to him. Each morning, when the coop door opened, Sunny stepped outside with excitement, breathing in the fresh air and listening to the familiar sounds of the farm waking up. While most chicks stayed near the coop, Sunny explored. He learned where the ground felt warmest under the sun and which paths always led back home. He watched the farmer walk the same route every day and noticed how the windmill turned slowly, never stopping.\n\nOne afternoon, the farm felt unusually quiet. Sunny walked farther than he ever had before, following a line of tall grass. Slowly, the barn became smaller, and the sounds of other chickens faded. Sunny stopped and felt something new - uncertainty.\n\nInstead of running, Sunny stood still. He remembered the lessons he had learned while exploring. He listened carefully. The sound of the windmill, the distant clucking, and the creak of wood guided him back. When Sunny returned, the sun was already lower in the sky. He felt proud, not because he went far, but because he knew how to come back. That day, Sunny learned that freedom feels best when paired with awareness.',
  },
  {
    id: 'story_2',
    title: 'Sunny and the Day He Went Too Far',
    preview:
      'Sunny had always believed that the farm was a place without borders. From the moment he hatched, he felt...',
    price: 0,
    fullText:
      'Sunny had always believed that the farm was a place without borders. From the moment he hatched, he felt that every patch of grass, every stone, and every shadow belonged to him. Each morning, when the coop door opened, Sunny stepped outside with excitement, breathing in the fresh air and listening to the familiar sounds of the farm waking up. While most chicks stayed near the coop, Sunny explored.\n\nOne afternoon, the farm felt unusually quiet. Sunny walked farther than he ever had before, following a line of tall grass. Slowly, the barn became smaller, and the sounds of other chickens faded.\n\nInstead of running, Sunny stood still, listened carefully, and found his way back by familiar sounds. That day, Sunny learned that freedom feels best when paired with awareness.',
  },
  {
    id: 'story_3',
    title: 'Sunny and the Day He Went Too Far',
    preview:
      'Sunny had always believed that the farm was a place without borders. From the moment he hatched, he felt...',
    price: 100,
  },
  {
    id: 'story_4',
    title: 'Sunny and the Day He Went Too Far',
    preview:
      'Sunny had always believed that the farm was a place without borders. From the moment he hatched, he felt...',
    price: 100,
  },
  {
    id: 'story_5',
    title: 'Sunny and the Day He Went Too Far',
    preview:
      'Sunny had always believed that the farm was a place without borders. From the moment he hatched, he felt...',
    price: 100,
  },
];

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Why did Milo like exploring the shore?',
    options: [
      'He was looking for food',
      'He enjoyed being alone',
      'He liked noticing small changes around him',
      'He wanted to leave the brood',
    ],
    correctIndex: 2,
  },
  {
    id: 2,
    question: 'What helped Milo find his way back?',
    options: [
      'Calling loudly',
      'Running fast',
      'Remembering familiar patterns',
      'Following another duckling',
    ],
    correctIndex: 2,
  },
  {
    id: 3,
    question: 'What made the pond feel unfamiliar in Willow’s story?',
    options: [
      'Strong wind',
      'Fog covering the water',
      'Cold temperature',
      'Loud noises',
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    question: 'How did Willow help the brood stay calm?',
    options: [
      'By moving quickly',
      'By hiding',
      'By focusing on familiar sounds',
      'By waiting silently',
    ],
    correctIndex: 2,
  },
  {
    id: 5,
    question: 'What fascinated Pip the most?',
    options: ['Stones', 'Fish', 'Ripples on the water', 'Reeds'],
    correctIndex: 2,
  },
  {
    id: 6,
    question: 'What did Pip do when he drifted away?',
    options: [
      'Paddled harder',
      'Called for help',
      'Stopped and waited',
      'Returned immediately',
    ],
    correctIndex: 2,
  },
  {
    id: 7,
    question: 'What made the pond uncomfortable in Ember’s story?',
    options: ['Rain', 'Fog', 'A cold current', 'Mud'],
    correctIndex: 2,
  },
  {
    id: 8,
    question: 'How did the brood feel warmer?',
    options: [
      'By moving faster',
      'By staying close together',
      'By leaving the pond',
      'By resting alone',
    ],
    correctIndex: 1,
  },
  {
    id: 9,
    question: 'What distracted Rowan?',
    options: ['A fish', 'A reflection', 'A floating leaf', 'A sound'],
    correctIndex: 2,
  },
  {
    id: 10,
    question: 'How did Rowan return to the brood?',
    options: [
      'By following the leaf',
      'By calling out',
      'By following gentle water movement',
      'By waiting for help',
    ],
    correctIndex: 2,
  },
  {
    id: 11,
    question: 'What was Pebble afraid of?',
    options: ['Deep water', 'Reeds', 'A slippery bank', 'Cold wind'],
    correctIndex: 2,
  },
  {
    id: 12,
    question: 'How did Pebble overcome his fear?',
    options: [
      'By rushing',
      'By copying others',
      'By moving slowly and carefully',
      'By avoiding the bank',
    ],
    correctIndex: 2,
  },
  {
    id: 13,
    question: 'What did Drizzle enjoy watching?',
    options: ['Clouds', 'Leaves', 'Rain rings on the pond', 'Insects'],
    correctIndex: 2,
  },
  {
    id: 14,
    question: 'How did Drizzle make waiting easier?',
    options: [
      'By sleeping',
      'By imagining stories',
      'By swimming',
      'By calling others',
    ],
    correctIndex: 1,
  },
  {
    id: 15,
    question: 'What made Berry different?',
    options: [
      'He explored alone',
      'He found food',
      'He shared resting spots',
      'He stayed quiet',
    ],
    correctIndex: 2,
  },
  {
    id: 16,
    question: 'What happened when Berry shared space?',
    options: [
      'Others left',
      'The brood rested together more often',
      'The spot disappeared',
      'Nothing changed',
    ],
    correctIndex: 1,
  },
  {
    id: 17,
    question: 'Why did Tick like routines?',
    options: [
      'They were exciting',
      'They made him feel calm',
      'They were faster',
      'They avoided others',
    ],
    correctIndex: 1,
  },
  {
    id: 18,
    question: 'What challenged Tick’s routine?',
    options: [
      'Weather',
      'Other ducklings',
      'Reeds blocking the path',
      'Hunger',
    ],
    correctIndex: 2,
  },
  {
    id: 19,
    question: 'What worried Feather?',
    options: [
      'Losing direction',
      'Cold water',
      'A piece of down drifting away',
      'Loud sounds',
    ],
    correctIndex: 2,
  },
  {
    id: 20,
    question: 'How did Feather feel in the end?',
    options: ['Angry', 'Lonely', 'Relieved with help from others', 'Confused'],
    correctIndex: 2,
  },
  {
    id: 21,
    question: 'What was Olive especially good at?',
    options: [
      'Swimming fast',
      'Watching reflections',
      'Listening carefully',
      'Leading the brood',
    ],
    correctIndex: 2,
  },
  {
    id: 22,
    question: 'What did Olive notice before others?',
    options: [
      'Food',
      'Storms and changes in water sounds',
      'New paths',
      'Shadows',
    ],
    correctIndex: 1,
  },
  {
    id: 23,
    question: 'What made Frost hesitate?',
    options: ['Fog', 'Deep water', 'Cold air and water', 'Noise'],
    correctIndex: 2,
  },
  {
    id: 24,
    question: 'How did Frost adapt?',
    options: [
      'By turning back',
      'By rushing',
      'By slowly following the brood',
      'By stopping completely',
    ],
    correctIndex: 2,
  },
  {
    id: 25,
    question: 'What did Wander enjoy the most?',
    options: [
      'Swimming fast',
      'Floating with the current',
      'Staying near shore',
      'Exploring land',
    ],
    correctIndex: 1,
  },
  {
    id: 26,
    question: 'How did Wander return home?',
    options: [
      'By paddling hard',
      'By calling out',
      'By waiting for the current to change',
      'By following others',
    ],
    correctIndex: 2,
  },
  {
    id: 27,
    question: 'What did Patience dislike?',
    options: ['Wind', 'Cold water', 'Stillness and waiting', 'Darkness'],
    correctIndex: 2,
  },
  {
    id: 28,
    question: 'What did Patience discover?',
    options: [
      'Waiting wastes time',
      'Stillness has its own calm',
      'Movement is better',
      'Quiet is boring',
    ],
    correctIndex: 1,
  },
  {
    id: 29,
    question: 'When did the brood feel most at peace?',
    options: [
      'At midday',
      'During rain',
      'In the evening together',
      'Early morning',
    ],
    correctIndex: 2,
  },
  {
    id: 30,
    question: 'What did the brood learn about home?',
    options: [
      'It is a specific place',
      'It is where food is',
      'It is a feeling of safety and closeness',
      'It changes every day',
    ],
    correctIndex: 2,
  },
];

const Duckbroodrwastrs: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const initialTab = ((route.params as {tab?: TabType})?.tab ??
    'stories') as TabType;
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const {duckbroodEggs, setDuckbroodEggs, duckbroodVibration} = useStore();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizGameOver, setQuizGameOver] = useState(false);
  const [unlockedStoryIds, setUnlockedStoryIds] = useState([
    'story_1',
    'story_2',
  ]);
  const storyShakeRef = React.useRef<Record<string, Animated.Value>>({});
  const storyShakeAnimRef = React.useRef<
    Record<string, {stop: () => void} | null>
  >({});

  const isStoriesTab = useMemo(() => activeTab === 'stories', [activeTab]);
  const currentQuestion = quizQuestions[quizIndex];

  const getStoryShakeValue = (storyId: string) => {
    if (!storyShakeRef.current[storyId]) {
      storyShakeRef.current[storyId] = new Animated.Value(0);
    }

    return storyShakeRef.current[storyId];
  };

  React.useEffect(() => {
    return () => {
      Object.values(storyShakeAnimRef.current).forEach(a => a?.stop());
      storyShakeAnimRef.current = {};
    };
  }, []);

  React.useEffect(() => {
    Object.values(storyShakeRef.current).forEach(value => {
      const id = value.addListener(({value}) => {
        console.log('storyShakeValue', value);
      });
      return () => value.removeListener(id);
    });
  }, []);

  const shakeStoryTradeButton = (storyId: string) => {
    const value = getStoryShakeValue(storyId);
    storyShakeAnimRef.current[storyId]?.stop();
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
    storyShakeAnimRef.current[storyId] = anim;
    anim.start(({finished}) => {
      if (finished) {
        storyShakeAnimRef.current[storyId] = null;
      }
    });
  };

  const handleTradeStory = (storyId: string, storyPrice: number) => {
    if (duckbroodEggs < storyPrice) {
      shakeStoryTradeButton(storyId);
      return;
    }

    setDuckbroodEggs(duckbroodEggs - storyPrice);
    setUnlockedStoryIds(prev => [...prev, storyId]);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizGameOver(false);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null || quizGameOver) {
      return;
    }

    if (selectedOption !== currentQuestion.correctIndex) {
      setQuizGameOver(true);
      return;
    }

    const nextScore = quizScore + 1;
    setQuizScore(nextScore);
    setDuckbroodEggs(duckbroodEggs + 1);
    setSelectedOption(null);

    if (quizIndex >= quizQuestions.length - 1) {
      setQuizGameOver(true);
      return;
    }

    setQuizIndex(prev => prev + 1);
  };

  const handleShareQuiz = async () => {
    try {
      await Share.share({
        message: `Quiz score: ${quizScore}`,
      });
    } catch (error) {
      // Ignore share cancellation.
    }
  };

  React.useEffect(() => {
    if (quizGameOver && duckbroodVibration) {
      Vibration.vibrate(220);
    }
  }, [duckbroodVibration, quizGameOver]);

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

        <View style={styles.tabHeader}>
          <TouchableOpacity
            activeOpacity={0.9}
            disabled={isStoriesTab}
            onPress={() => setActiveTab('stories')}>
            <Image
              source={require('../../elements/images/duckbrhsleft.png')}
              style={isStoriesTab ? styles.arrowDisabled : {}}
            />
          </TouchableOpacity>

          <Text style={styles.tabTitle}>
            {isStoriesTab ? 'STORIES' : 'QUIZ'}
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            disabled={!isStoriesTab}
            onPress={() => setActiveTab('quiz')}>
            <Image
              source={require('../../elements/images/duckbrhright.png')}
              style={!isStoriesTab ? styles.arrowDisabled : {}}
            />
          </TouchableOpacity>
        </View>

        {isStoriesTab ? (
          <ScrollView
            style={styles.storyList}
            contentContainerStyle={styles.storyListContent}
            showsVerticalScrollIndicator={false}>
            {storyItems.map(item => {
              const isLocked = !unlockedStoryIds.includes(item.id);
              return (
                <View key={item.id} style={styles.storyBlock}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    disabled={isLocked}
                    onPress={() =>
                      navigation.navigate('Duckbroodrwastrsdet', {
                        title: item.title,
                        text: item.fullText ?? item.preview,
                      })
                    }>
                    <LinearGradient
                      colors={
                        isLocked
                          ? ['#FFFFFF99', '#FFFFFF99']
                          : ['#E7DF3F', '#FFF97E']
                      }
                      style={styles.storyCard}>
                      <View style={styles.storyInner}>
                        <Text style={styles.storyTitle}>{item.title}</Text>
                        <Text style={styles.storyPreview}>{item.preview}</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>

                  {isLocked ? (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => handleTradeStory(item.id, item.price)}>
                      <Animated.View
                        style={{
                          transform: [
                            {
                              translateX: getStoryShakeValue(
                                item.id,
                              ).interpolate({
                                inputRange: [-1, 1],
                                outputRange: [-8, 8],
                              }),
                            },
                          ],
                        }}>
                        <LinearGradient
                          colors={['#4DB240', '#66D357']}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          style={styles.tradeButton}>
                          <Text style={styles.tradeButtonText}>
                            Trade - {item.price}
                          </Text>
                          <Image
                            source={require('../../elements/images/duckbrhlegg.png')}
                          />
                        </LinearGradient>
                      </Animated.View>
                    </TouchableOpacity>
                  ) : null}
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.quizDock}>
            {!quizStarted ? (
              <TouchableOpacity activeOpacity={0.9} onPress={handleStartQuiz}>
                <LinearGradient
                  colors={['#4DB240', '#66D357']}
                  style={styles.quizStartButton}>
                  <Text style={styles.quizStartText}>Start</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : !quizGameOver ? (
              <View style={styles.quizArea}>
                <Text style={styles.quizScoreText}>Score:{quizScore}</Text>

                <LinearGradient
                  colors={['#E7DF3F', '#FFF97E']}
                  style={styles.quizQuestionCard}>
                  <View style={styles.quizQuestionInner}>
                    <Text style={styles.quizQuestionText}>
                      {currentQuestion.question}
                    </Text>
                  </View>
                </LinearGradient>

                <View style={styles.quizOptionsWrap}>
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOption === index;

                    return (
                      <TouchableOpacity
                        key={`${currentQuestion.id}_${index}`}
                        activeOpacity={0.9}
                        onPress={() => setSelectedOption(index)}>
                        <LinearGradient
                          colors={['#E7DF3F', '#FFF97E']}
                          style={[
                            styles.quizOptionButton,
                            isSelected && styles.quizOptionSelected,
                          ]}>
                          <View style={styles.quizOptionInner}>
                            <Text style={styles.quizOptionText}>{option}</Text>
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={handleNextQuestion}
                  disabled={selectedOption === null}>
                  <LinearGradient
                    colors={['#4DB240', '#66D357']}
                    style={[
                      styles.quizNextButton,
                      selectedOption === null && styles.quizNextButtonDisabled,
                    ]}>
                    <Text style={styles.quizNextText}>Next</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.quizGameOverWrap}>
                <Image
                  source={require('../../elements/images/duckbrhsgmover.png')}
                />
                <Text style={styles.quizGameOverScore}>Score:{quizScore}</Text>

                <TouchableOpacity activeOpacity={0.9} onPress={handleShareQuiz}>
                  <LinearGradient
                    colors={['#FEE43B', '#FEA33B']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.quizShareButton}>
                    <Text style={styles.quizShareText}>Share</Text>
                    <Image
                      source={require('../../elements/images/duckbrhsgmshr.png')}
                    />
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.9} onPress={handleStartQuiz}>
                  <LinearGradient
                    colors={['#4DB240', '#66D357']}
                    style={styles.quizRestartButton}>
                    <Text style={styles.quizRestartText}>Restart</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </Duckbroodrwaylay>
  );
};

export default Duckbroodrwastrs;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 55,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  tabHeader: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 24,
  },
  tabTitle: {
    color: '#157707',
    fontWeight: '700',
    fontSize: 24,
  },
  arrowText: {
    color: '#049431',
    fontSize: 44,
    fontWeight: '800',
  },
  arrowDisabled: {
    opacity: 0.25,
  },
  storyList: {
    flex: 1,
    marginTop: 12,
    paddingHorizontal: 24,
  },
  storyListContent: {
    paddingBottom: 20,
  },
  storyBlock: {
    marginBottom: 12,
  },
  storyCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    minHeight: 100,
  },
  storyInner: {
    padding: 20,
  },
  storyTitle: {
    color: '#157707',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
  },
  storyPreview: {
    color: '#157707',
    fontSize: 13,
    textAlign: 'center',
  },
  tradeButton: {
    marginTop: 10,
    height: 52,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#157707',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  tradeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 24,
  },
  quizDock: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40,
  },
  quizStartButton: {
    width: 270,
    height: 80,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#157707',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizStartText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 44,
    transform: [{scaleX: 0.5}, {scaleY: 0.5}],
  },
  quizArea: {
    width: '100%',
    alignItems: 'center',
  },
  quizScoreText: {
    color: '#157707',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 18,
  },
  quizQuestionCard: {
    width: '90%',
    minHeight: 106,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  quizQuestionInner: {
    padding: 20,
  },
  quizQuestionText: {
    color: '#157707',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 23,
  },
  quizOptionsWrap: {
    width: '100%',
    gap: 10,
    marginBottom: 26,
  },
  quizOptionButton: {
    minHeight: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  quizOptionInner: {
    paddingHorizontal: 14,
  },
  quizOptionSelected: {
    borderWidth: 1.5,
  },
  quizOptionText: {
    color: '#157707',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  quizNextButton: {
    width: 230,
    height: 70,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#157707',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  quizNextButtonDisabled: {
    opacity: 0.5,
  },
  quizNextText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 44,
    transform: [{scaleX: 0.5}, {scaleY: 0.5}],
  },
  quizGameOverWrap: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  quizGameOverScore: {
    color: '#057429',
    fontSize: 56,
    fontWeight: '900',
    transform: [{scaleX: 0.5}, {scaleY: 0.5}],
    marginTop: 16,
    marginBottom: 18,
  },
  quizShareButton: {
    width: 180,
    height: 58,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E3851A',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
    marginBottom: 22,
  },
  quizShareText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  quizRestartButton: {
    width: 270,
    height: 80,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#157707',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizRestartText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 44,
    transform: [{scaleX: 0.5}, {scaleY: 0.5}],
  },
});
