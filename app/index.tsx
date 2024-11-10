import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Link } from 'expo-router';

const BusinessDonationScreen = () => {
  const [tiers, setTiers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/sponsorship-tiers');
        setTiers(response.data.data || []);
      } catch (error) {
        console.error('Error fetching tiers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTiers();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.businessDonation}>BUSINESS DONATION</Text>
      <Text style={styles.schoolName}>RIVERVIEW HIGH SCHOOL{"\n"}TRACK & FIELD TEAM</Text>

      <FlatList
        data={tiers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const tierName = item.tierName || 'Unknown Tier';
          const tierRank = item.tierRank;
          const benefits = item.advertisingBenefits;

          // Determine text color based on tier
          let textColor;
          switch (tierName.toLowerCase()) {
            case 'bronze':
              textColor = '#CD7F32';
              break;
            case 'silver tier':
              textColor = '#767676';
              break;
            case 'gold tier':
              textColor = '#EBB70E';
              break;
            default:
              textColor = '#000'; // Default color for other tiers
          }

          return (
            <View style={[styles.tierContainer, getTierStyle(tierRank)]}>
              <Link href={{pathname: "/tier/[tierName]", params: {tierName}}} style={[styles.tierName, { color: textColor }]}>
                <Text >
                  {tierName.toUpperCase()}
                </Text>
              </Link>
              <Text style={styles.benefitText}>{benefits}</Text>
              <Text style={[styles.minimumDonation, { color: textColor }]}>
                Minimum Donation: ${item.MinimumDonationAmount}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const getTierStyle = (tierRank: string) => {
  switch (tierRank) {
    case '3':
      return styles.bronzeTier;
    case '2':
      return styles.silverTier;
    case '1':
      return styles.goldTier;
    case '0':
      return styles.diamondTier;
    default:
      return styles.defaultTier;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  businessDonation: {
    color: '#000',
    fontFamily: 'Lovelo',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 39,
    letterSpacing: -0.3,
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 8,
  },
  schoolName: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Lovelo',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 20,
  },
  tierContainer: {
    width: 366,
    height: 'auto',
    borderRadius: 10,
    backgroundColor: '#F4F4F4',
    alignSelf: 'center',
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bronzeTier: {
    borderColor: '#CD7F32',
    borderWidth: 1,
  },
  silverTier: {
    borderColor: '#767676',
    borderWidth: 1,
  },
  goldTier: {
    borderColor: '#EBB70E',
    borderWidth: 1,
  },
  diamondTier: {
    borderColor: '#00B1DA',
    borderWidth: 1,
  },
  defaultTier: {
    borderColor: '#000',
    borderWidth: 1,
  },
  tierName: {
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'Lovelo',
    color: '#000',
    textAlign: 'center',
    paddingTop: 12,
    marginBottom: 8,
  },
  benefitText: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    lineHeight: 22,
    marginVertical: 10,
  },
  minimumDonation: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
  },
});

export default BusinessDonationScreen;


