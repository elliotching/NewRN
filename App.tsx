/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const getRandom = () => {
  return Math.random() * 255;
};

const getRandomBackgroundColor: () => void = () => {
  return `rgba(${getRandom()},${getRandom()},${getRandom()}, 0.3)`;
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getItem = (n: number): JSX.Element[] => {
    const out: JSX.Element[] = [];
    for (let i = 0; i < n; i++) {
      out.push(
        // <>
        <View
          key={'getItem' + i}
          style={{backgroundColor: getRandomBackgroundColor(), height: 100}}
        />,
        // </>,
      );
    }
    return out;
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="never"
        style={{
          height: '100%',
          // flex: 1,
          ...backgroundStyle,
          backgroundColor: getRandomBackgroundColor(),
          // backgroundColor: 'rgba(255, 255, 255)',
        }}>
        <View
          style={{backgroundColor: getRandomBackgroundColor(), height: 100}}
        />
        <View
          style={{backgroundColor: getRandomBackgroundColor(), height: 100}}
        />
        <View
          style={{backgroundColor: getRandomBackgroundColor(), height: 100}}
        />
        {getItem(100)}

        {/* <FlatList
          data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
          renderItem={() => (
            <View
              style={{backgroundColor: getRandomBackgroundColor(), height: 100}}
            />
          )}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
