import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
const minutesToMillies = (minutes) => minutes * 1000 * 60;
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const formatTimer = (time) => (time < 10 ? `0${time}` : time);
export const Countdown = ({ minutes = 20, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(null);

  const interval = useRef(null);
  const countdown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };
  useEffect(() => {
    onProgress(timeLeft / minutesToMillies(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);
  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
    } else {
      interval.current = setInterval(countdown, 1000);
    }
    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setMillis(minutesToMillies(minutes));
  }, [minutes]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTimer(minute)}:{formatTimer(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    color: colors.white,
    padding: spacing.lg,
    fontWeight: 'bold',
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
