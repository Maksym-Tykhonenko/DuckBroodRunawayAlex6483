import {ImageSourcePropType} from 'react-native';

export type DuckShopItem = {
  id: string;
  title: string;
  points: number;
  description: string;
  price: number;
  image: ImageSourcePropType;
};

export const duckShopItems: DuckShopItem[] = [
  {
    id: 'classic',
    title: 'Classic Yellow Duckling',
    points: 1,
    price: 0,
    description:
      "This duckling is always the first to step forward. It doesn't rush, doesn't hesitate, and somehow always finds its way back home. Simple moments bring simple progress.",
    image: require('../../elements/images/duckbrhsdk1.png'),
  },
  {
    id: 'cream',
    title: 'Cream Duckling',
    points: 2,
    price: 0,
    description:
      'Cream Duckling moves quietly but never gets lost. It knows when to slow down and when to keep going, turning calm decisions into steady progress.',
    image: require('../../elements/images/duckbrhsdk2.png'),
  },
  {
    id: 'mint',
    title: 'Mint Duckling',
    points: 3,
    price: 0,
    description:
      "Mint Duckling feels different from the rest. It doesn't follow familiar paths and often surprises with unexpected turns that lead to better results.",
    image: require('../../elements/images/duckbrhsdk3.png'),
  },
  {
    id: 'spotted',
    title: 'Spotted Duckling',
    points: 4,
    price: 300,
    description:
      'Spotted Duckling loves wandering just a bit farther than planned. Its curiosity often pays off, bringing more progress to those who dare to chase it.',
    image: require('../../elements/images/duckbrhsdk4.png'),
  },
  {
    id: 'sleepy',
    title: 'Sleepy Duckling',
    points: 5,
    price: 400,
    description:
      "Sleepy Duckling looks relaxed, but don't be fooled. It rewards patience and focus, proving that calm play can lead to strong results.",
    image: require('../../elements/images/duckbrhsdk5.png'),
  },
  {
    id: 'hat',
    title: 'Hat Duckling',
    points: 6,
    price: 500,
    description:
      "Hat Duckling knows exactly where it's going. Confident and cheerful, it turns every successful run into maximum progress for the flock.",
    image: require('../../elements/images/duckbrhsdk6.png'),
  },
];
