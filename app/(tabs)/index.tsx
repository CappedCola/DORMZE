import { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolateColor,
  withTiming,
} from 'react-native-reanimated';
import { ProfileCard } from '@/components/ProfileCard';
import { useStore } from '@/store/useStore';
import { mockProfiles } from '@/data/mockProfiles';
import { Profile } from '@/types/profile';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/styles/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

export default function SwipeScreen() {
  const { profiles, currentIndex, setProfiles, nextProfile, addMatch } =
    useStore();
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const rotation = useSharedValue(0);
  const cardOpacity = useSharedValue(1);
  const swipeDirection = useSharedValue(0); // 0 for neutral, positive for right, negative for left

  useEffect(() => {
    setProfiles(mockProfiles);
  }, []);

  const handleSwipe = (isRight: boolean) => {
    if (isRight && profiles[currentIndex]) {
      addMatch(profiles[currentIndex]);
    }

    // Add a small delay before resetting values to ensure smooth transition
    cardOpacity.value = withTiming(0, { duration: 300 }, () => {
      // Reset values after the card fades out
      runOnJS(nextProfile)();
      x.value = 0;
      y.value = 0;
      rotation.value = 0;
      swipeDirection.value = 0;
      cardOpacity.value = withTiming(1, { duration: 300 });
    });
  };

  const gesture = Gesture.Pan()
    .onChange((event: { translationX: number; translationY: number }) => {
      x.value = event.translationX;
      y.value = event.translationY;
      rotation.value = (event.translationX / SCREEN_WIDTH) * 12; // Subtle rotation

      // Update swipe direction based on horizontal movement
      if (event.translationX > 0) {
        // Swiping right - normalize value between 0 and 1
        swipeDirection.value = Math.min(
          1,
          event.translationX / SWIPE_THRESHOLD
        );
      } else if (event.translationX < 0) {
        // Swiping left - normalize value between 0 and -1
        swipeDirection.value = Math.max(
          -1,
          event.translationX / SWIPE_THRESHOLD
        );
      } else {
        swipeDirection.value = 0;
      }
    })
    .onEnd((event: { translationX: number }) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        // Swipe past threshold - complete the swipe with spring animation
        x.value = withSpring(
          Math.sign(event.translationX) * SCREEN_WIDTH * 1.5,
          { damping: 15, stiffness: 100 }
        );
        y.value = withSpring(0);
        rotation.value = withSpring(Math.sign(event.translationX) * 25);
        swipeDirection.value = withTiming(Math.sign(event.translationX), {
          duration: 200,
        });

        runOnJS(handleSwipe)(event.translationX > 0);
      } else {
        // Return to center with spring animation
        x.value = withSpring(0, { damping: 15 });
        y.value = withSpring(0, { damping: 15 });
        rotation.value = withSpring(0, { damping: 15 });
        swipeDirection.value = withTiming(0, { duration: 200 });
      }
    });

  const cardStyleAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { rotate: `${rotation.value}deg` },
      ],
      opacity: cardOpacity.value,
    };
  });

  // Create an overlay animation style for the green/red effect
  const overlayAnimatedStyle = useAnimatedStyle(() => {
    // Determine color based on swipe direction
    const overlayColor = interpolateColor(
      swipeDirection.value,
      [-1, 0, 1],
      [
        'rgba(255, 70, 70, 0.6)', // Red for left swipe
        'rgba(0, 0, 0, 0)', // Transparent in center
        'rgba(46, 204, 113, 0.6)', // Green for right swipe
      ]
    );

    return {
      backgroundColor: overlayColor,
      opacity: Math.abs(swipeDirection.value),
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 20,
      zIndex: 10,
    };
  });

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
            <Animated.View
              style={[styles.animatedContainer, cardStyleAnimated]}
            >
              <ProfileCard profile={profile} isActive={true} />
              <Animated.View style={overlayAnimatedStyle} />
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
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
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
    borderRadius: 20,
    overflow: 'hidden',
  },
});
