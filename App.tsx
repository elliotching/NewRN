/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {
    useEffect,
    useState,
    useReducer,
    useRef,
    useLayoutEffect,
} from 'react';
import type {PropsWithChildren} from 'react';
import {Log} from './log';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Appearance,
    ListRenderItemInfo,
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

interface ListType {
    special: boolean;
    color: string;
    text?: string;
}

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
type StateType = {
    name: string;
    withArray: boolean;
};

type ActionType = {
    type: string;
    payload?: any;
};

const initialState: StateType = {
    name: 'unknown',
    withArray: false,
};
function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    let flatListRef = useRef<FlatList<ListType>>(null);

    const [arrayList, setArrayList] = useState<ListType[]>();

    // const [specialHeader, setSpecialHeader] = useState<{color: string}[]>();

    const [n, setN] = useState<number>(100);

    const reducer = (state: StateType, action: ActionType): StateType => {
        switch (action.type) {
            case 'a':
                if (state.name == 'updated') {
                    return {withArray: false, name: 'unknown'};
                } else {
                    // setTimeout(() => {
                    //     flatListRef.current?.scrollToOffset({
                    //         offset: 2000,
                    //         animated: false,
                    //     });
                    // }, 100);
                    return {withArray: true, name: 'updated'};
                }

            default:
                return state;
        }
    };

    const [stateA, dispatchA] = useReducer(reducer, initialState);

    useLayoutEffect(() => {
        if (stateA.withArray) {
            setTimeout(() => {
                flatListRef.current?.scrollToOffset({
                    offset: 2000,
                    animated: true,
                });
            }, 100);
        }
    }, [stateA.withArray]);

    useEffect(() => {
        onInit();
        return () => onInit();
    }, []);

    const onInit = (): void => {
        console.log('current color', Appearance.getColorScheme());
        const out: ListType[] = [];

        out.push({
            special: true,
            color: getRandomBackgroundColor(),
            text: 'Speial header 01',
        });
        out.push({
            special: true,
            color: getRandomBackgroundColor(),
            text: 'Speial header 02',
        });
        for (let i = 0; i < n; i++) {
            out.push({
                special: false,
                color: getRandomBackgroundColor(),
                text: i.toString(),
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

    const MyArrayItem = (item: ListRenderItemInfo<ListType>) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: item.item.color,
                    height: 100,
                }}>
                <Text>{item.item?.text}</Text>
                {/* <Text>{item?.text}</Text> */}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{backgroundColor: '#ff000040', flex: 1}}>
            {/* <View style={{backgroundColor: '#ff000010'}}></View> */}
            {/* <StatusBar
                // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                // backgroundColor={backgroundStyle.backgroundColor}
                backgroundColor={'#ffff00'}
            /> */}
            <>
                <TouchableOpacity
                    style={{height: 100, backgroundColor: '#ff000040'}}
                    onPress={() => {
                        dispatchA({type: 'a'});
                    }}
                />
                <FlatList
                    ref={flatListRef}
                    style={{flex: 1}}
                    data={!!stateA.withArray ? arrayList : null}
                    keyExtractor={(item, index) => 'Item:' + index.toString()}
                    // onScrollEndDrag={event => {
                    //     Log(
                    //         'onScrollEndDrag' +
                    //             event.nativeEvent.contentOffset.y,
                    //     );
                    // }}
                    onMomentumScrollEnd={event => {
                        Log(
                            'onMomentumScrollEnd' +
                                event.nativeEvent.contentOffset.y,
                        );
                    }}
                    renderItem={item => <MyArrayItem item={item.item} />}
                    // ListHeaderComponent={<HeaderComponent />}
                />
                <TouchableOpacity
                    style={{height: 100, backgroundColor: '#ff000040'}}>
                    <Text>
                        {stateA.name} and {(!!stateA.withArray).toString()}
                    </Text>
                </TouchableOpacity>
            </>
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
