/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
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
  Appearance,
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

const getRandom = (): number => {
  return Math.random() * 255;
};

const getRandomBackgroundColor = (): string => {
  return `rgba(${getRandom()},${getRandom()},${getRandom()}, 0.3)`;
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [arrayList, setArrayList] = useState<{color: string}[]>();
  const [n, setN] = useState<number>(100);

  useEffect(() => {
    onInit();
    return () => onInit();
  }, []);

  const onInit = (): void => {
    console.log('current color', Appearance.getColorScheme());
    const out: {color: string}[] = [];
    for (let i = 0; i < n; i++) {
      out.push({
        color: getRandomBackgroundColor(),
      });
    }
    setArrayList(out);
  };

  // const getItem = (n: number): JSX.Element[] => {
  //   const out: JSX.Element[] = [];
  //   for (let i = 0; i < n; i++) {
  //     out.push(
  //       // <>
  //       <View
  //         key={'getItem' + i}
  //         style={{backgroundColor: getRandomBackgroundColor(), height: 100}}
  //       />,
  //       // </>,
  //     );
  //   }
  //   return out;
  // };

  return (
    <SafeAreaView
      style={{backgroundColor: '#ff000040', flex: 1, borderWidth: 4}}>
      {/* <View style={{backgroundColor: '#ff000010'}}></View> */}
      <StatusBar
        // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        // backgroundColor={backgroundStyle.backgroundColor}
        backgroundColor={'#ffff00'}
      />
      <FlatList
        style={{}}
        data={arrayList}
        keyExtractor={(item, index) => 'Item:' + index.toString()}
        renderItem={item => (
          <View style={{backgroundColor: item.item.color, height: 100}}>
            <Text>{item.index}</Text>
          </View>
        )}
        // ListHeaderComponent={<HeaderComponent />}
      />
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
