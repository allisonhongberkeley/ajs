import { View, Image, StyleSheet } from 'react-native';

export default function ProgressBar({ step }: { step: number }) {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        {step >= 1 ? (
          <Image
            source={require('@/assets/images/strawberry.png')} 
            style={styles.icon}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.emptyCircle} />
        )}
      </View>

      <View style={styles.circle}>
        {step >= 2 ? (
          <Image
          source={require('@/assets/images/carrot.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        ) : (
          <View style={styles.emptyCircle} />
        )}
      </View>

      <View style={styles.circle}>
        {step >= 3 ? (
          <View style={styles.filledCircle} />
        ) : (
          <View style={styles.emptyCircle} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: '#F1F8FF',
    borderRadius: 100,
    padding: 8,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D1D5DB', // light gray
  },
  filledCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4F46E5', 
  },
  icon: {
    width: 20,
    height: 20,
  },
});
