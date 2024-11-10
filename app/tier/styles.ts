// styles.ts
import { Dimensions, StyleSheet } from 'react-native';

// Set up responsive dimensions if needed
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Define constants for common values
const PADDING_TOP = 32;
const MARGIN_TOP = 45;
const IMAGE_SIZE = 100;

// Function to get tier-specific styles
export const getTierStyles = (tierName: string) => {
  // Define base styles common to all tiers
  const baseStyles = {
    container: {
      width: SCREEN_WIDTH * 0.5,  // 50% of screen width for responsiveness
      height: 515,
      flexShrink: 0,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      alignItems: 'center',
      padding: 20,
      margin: "auto",
    },
    logo: {
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
    },
    schoolName: {
      color: '#000',
      textAlign: 'center',
      fontFamily: 'Lovelo', // Ensure "Lovelo" is loaded in your project
      fontSize: 18,
      fontWeight: '900',
      lineHeight: 22,
      marginBottom: 39,
    },
    tierTitle: {
      paddingTop: PADDING_TOP,
      maxWidth: 500,
      width: '100%',
      height: 53,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      textAlign: 'center',
      fontFamily: 'Lovelo',
      fontSize: 48,
      fontWeight: '900',
    },
    frameSize: {
      paddingTop: 8,
      fontSize: 15,
      color: '#000',
      fontFamily: 'Open Sans',
      textAlign: 'center',
    },
    benefits: {
      paddingTop: PADDING_TOP,
      fontSize: 18,
      color: '#000',
      fontFamily: 'Lovelo',
      textAlign: 'center',
    },
    donationAmount: {
      marginTop: MARGIN_TOP,
      fontSize: 45,
      textAlign: 'center',
      fontFamily: 'Lovelo',
      fontWeight: '900',
    },
    donateButton: {
      padding: 16,
      marginTop: MARGIN_TOP,
      borderRadius: 30,
      backgroundColor: '#F4F4F4',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      textAlign: 'center',
    },
  };

  // Return tier-specific styles using conditional logic
  switch (tierName.toLowerCase()) {
    case 'bronze':
      return StyleSheet.create({
        ...baseStyles,
        container: {
          ...baseStyles.container,
          borderColor: '#CD7F32',
          backgroundColor: 'rgba(205, 127, 50, 0.16)',
        },
        tierTitle: {
          ...baseStyles.tierTitle,
          color: '#CD7F32',
        },
        donationAmount: {
          ...baseStyles.donationAmount,
          color: '#CD7F32',
        },
      });
    case 'silver':
      return StyleSheet.create({
        ...baseStyles,
        container: {
          ...baseStyles.container,
          borderColor: '#7E7E7E',
          backgroundColor: 'rgba(192, 192, 192, 0.16)',
        },
        tierTitle: {
          ...baseStyles.tierTitle,
          color: '#7E7E7E',
        },
        donationAmount: {
          ...baseStyles.donationAmount,
          color: '#7E7E7E',
        },
      });
    case 'gold':
      return StyleSheet.create({
        ...baseStyles,
        container: {
          ...baseStyles.container,
          borderColor: '#EBB70E',
          backgroundColor: 'rgba(235, 183, 14, 0.15)',
        },
        tierTitle: {
          ...baseStyles.tierTitle,
          color: '#EBB70E',
        },
        donationAmount: {
          ...baseStyles.donationAmount,
          color: '#EBB70E',
        },
      });
    default:
      return StyleSheet.create(baseStyles); // Return base styles by default
  }
};
