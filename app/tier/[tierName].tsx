// [tierName].tsx
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { getTierStyles } from './styles';

const TierScreen = () => {
  const { tierName } = useLocalSearchParams();
  const [tierData, setTierData] = useState(null);
  const [loading, setLoading] = useState(true);

  const styles = getTierStyles(tierName.toString() || 'default'); // Get styles based on tierName

  useEffect(() => {
    const fetchTierData = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/sponsorship-tiers?filters[tierName][$eq]=${tierName}`);
        setTierData(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching tier data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTierData();
  }, [tierName]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!tierData) {
    return (
      <View style={styles.container}>
        <Text>No data available for this tier</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.schoolName}>RIVERVIEW HIGH SCHOOL{"\n"}TRACK & FIELD TEAM</Text>
      <Text style={styles.tierTitle}>{tierName?.toUpperCase()}</Text>
      <Text style={styles.benefits}>Advertising Benefits: {tierData.tierDescription}</Text>
      <Text style={styles.donationAmount}>${tierData.MinimumDonationAmount}</Text>
      <Text style={styles.donateButton}>Donate Now</Text>
    </View>
  );
};

export default TierScreen;
