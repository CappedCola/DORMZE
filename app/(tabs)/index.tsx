import { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { ProfileCard } from '@/components/ProfileCard';
import { useStore } from '@/store/useStore';
import { mockProfiles } from '@/data/mockProfiles';
import { Profile } from '@/types/profile';
import { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

export default function SwipeScreen() {
  const { profiles, currentIndex, setProfiles, nextProfile, addMatch } =
    useStore();
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  useEffect(() => {
    setProfiles(mockProfiles);
  }, []);

  const handleSwipe = (isRight: boolean) => {
    if (isRight && profiles[currentIndex]) {
      addMatch(profiles[currentIndex]);
    }
    nextProfile();
    x.value = 0;
    y.value = 0;
  };

  const gesture = Gesture.Pan()
    .onChange((event: { translationX: number; translationY: number }) => {
      x.value = event.translationX;
      y.value = event.translationY;
    })
    .onEnd((event: { translationX: number }) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        x.value = withSpring(
          Math.sign(event.translationX) * SCREEN_WIDTH * 1.5
        );
        y.value = withSpring(0);
        runOnJS(handleSwipe)(event.translationX > 0);
      } else {
        x.value = withSpring(0);
        y.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      {
        rotate: `${(x.value / SCREEN_WIDTH) * 20}deg`,
      },
    ],
  }));

  const renderCard = (profile: Profile, index: number) => {
    const isActive = index === currentIndex;
    const isNext = index === currentIndex + 1;

    if (!isActive && !isNext) return null;

    if (Platform.OS === 'web') {
      return (
        <View
          key={profile.id}
          style={[
            styles.cardContainer,
            isNext ? styles.nextCard : styles.activeCard,
          ]}
        >
          <ProfileCard profile={profile} isActive={isActive} />
        </View>
      );
    }

    if (isActive) {
      return (
        <View
          key={profile.id}
          style={[styles.cardContainer, styles.activeCard]}
        >
          <GestureDetector gesture={gesture}>
            <Animated.View style={styles.animatedContainer}>
              <ProfileCard
                profile={profile}
                isActive={true}
                style={animatedStyle}
              />
            </Animated.View>
          </GestureDetector>
        </View>
      );
    }

    return (
      <View key={profile.id} style={[styles.cardContainer, styles.nextCard]}>
        <ProfileCard profile={profile} isActive={false} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {profiles.map((profile: Profile, index: number) =>
        renderCard(profile, index)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    position: 'relative',
  },
  cardContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH - 32,
    alignSelf: 'center',
  },
  activeCard: {
    zIndex: 10,
  },
  nextCard: {
    zIndex: 5,
    transform: [{ scale: 0.95 }, { translateY: 10 }],
    opacity: 0.8,
  },
  animatedContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
