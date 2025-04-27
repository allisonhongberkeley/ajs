import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CameraProfileToggle } from '@/components/CameraProfileToggle';
import { useRouter } from 'expo-router';
import { AllergenTag } from '@/components/AllergenTag';
import { useUserPreferences } from '@/utils/preferencesContext';

export default function ProfileScreen() {
  const { selectedAllergens, selectedRestrictions } = useUserPreferences();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={require('@/assets/images/blueberry.png')}
          style={styles.profileImage}
        />
        <Text style={styles.emailText}>allisonhong@gmail.com</Text>
      </View>

      <View style={styles.card}>
      <Image
          source={require('@/assets/images/alert.png')}
          style={styles.nextIcon}
          resizeMode="contain"
        />
        <View style={styles.cardSubHeader}>
            <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Allergies</Text>
            <TouchableOpacity onPress={() => router.push('/allergens')}>
                <Image
                source={require('@/assets/images/edit.png')}
                style={styles.editIcon}
                resizeMode="contain"
                />
            </TouchableOpacity>
            </View>
            <View style={styles.tagsWrapper}>
            {selectedAllergens.map((item) => (
                <AllergenTag key={item} label={item} selected variant="allergen" border={false}/>
            ))}
            </View>
        </View>
      </View>

      {/* Dietary Restrictions Section */}
      <View style={styles.card}>
      <Image
          source={require('@/assets/images/glutenfree.png')}
          style={styles.nextIcon}
          resizeMode="contain"
        />
        <View style={styles.cardSubHeader}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Dietary Restrictions</Text>
          <TouchableOpacity onPress={() => router.push('/diet-restrictions')}>
            <Image
                source={require('@/assets/images/edit.png')}
                style={styles.editIcon}
                resizeMode="contain"
                />
          </TouchableOpacity>
        </View>
        <View style={styles.tagsWrapper}>
          {selectedRestrictions.map((item) => (
            <AllergenTag key={item} label={item} selected variant="diet" border={false}/>
          ))}
        </View>
        </View>
      </View>

      {/* Camera/Profile Toggle */}
      <CameraProfileToggle />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    marginTop: 40,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  emailText: {
    fontFamily: 'Space Mono',
    fontSize: 20,
    color: '#333',
  },
  card: {
    display: 'flex',
    gap: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 8,
  },
  cardSubHeader: {
    flexDirection: 'column',
    gap: 12,
  },
  cardTitle: {
    fontFamily: 'Space Mono',
    lineHeight: 22,
    fontSize: 16,
    color: '#333',
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  nextIcon: {
    width: 48,
    height: 48,
  },
  editIcon: {
    width: 20,
    height: 20,
  }
});
