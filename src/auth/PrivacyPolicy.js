import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PrivacyPolicy = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: isDark ? '#101317' : '#fff' },
      ]}
    >
      <View style={[{ elevation: 4, marginBottom: 10, height: 100, alignItems: 'center', justifyContent: 'center' }, {
        backgroundColor: isDark ? '#202327' : '#f8fafc',
        shadowColor: '#000',
        shadowOpacity: isDark ? 0.25 : 0.05,
        borderColor: isDark ? '#334155' : 'transparent',
        borderWidth: isDark ? 0.5 : 0,
      },]}>
        <Image source={require('../assets/mmtlogo.png')} style={{ width: 250, height: 150 }} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[
          styles.backBtn,
          {
            backgroundColor: isDark ? '#101317' : '#f8fafc',
            shadowColor: '#000',
            shadowOpacity: isDark ? 0.3 : 0.1,
          },
        ]} activeOpacity={0.7}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={isDark ? '#0a74ff' : '#1d74ff'}
        />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? '#0a74ff' : '#1d74ff' },
          ]}
        >
          Privacy Policy
        </Text>
        <Text
          style={[
            styles.headerText,
            { color: isDark ? '#cbd5e1' : '#555' },
          ]}
        >
          Please read this privacy policy carefully before using our app.
        </Text>

        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? '#202327' : '#f8fafc',
              shadowColor: '#000',
              shadowOpacity: isDark ? 0.25 : 0.05,
              borderColor: isDark ? '#334155' : 'transparent',
              borderWidth: isDark ? 0.5 : 0,
            },
          ]}
        >
          <Text
            style={[
              styles.titleText,
              { color: isDark ? '#0a74ff' : '#1d74ff' },
            ]}
          >
            Privacy Policy
          </Text>
          <Text
            style={[
              styles.bodyText,
              { color: isDark ? '#fff' : '#333' },
            ]}
          >
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text.{'\n'}
            All the Lorem Ipsum generators on the Internet tend to repeat
            predefined chunks as necessary, making this the first true generator
            on the Internet. It uses a dictionary of over 200 Latin words,
            combined with a handful of model sentence structures, to generate
            Lorem Ipsum which looks reasonable.{'\n'}
            The generated Lorem Ipsum is therefore always free from repetition,
            injected humour, or non-characteristic words etc.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backBtn: {
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 8,
    borderRadius: 30,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
