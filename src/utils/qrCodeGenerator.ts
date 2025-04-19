
import QRCode from 'qrcode';

interface GenerateQROptions {
  userId: string;
  missionId?: string;
  size?: number;
  margin?: number;
  color?: {
    dark: string;
    light: string;
  };
}

/**
 * Generate a QR code with embedded user and mission data
 */
export const generateQRCode = async ({
  userId,
  missionId = '',
  size = 200,
  margin = 4,
  color = {
    dark: '#8B5CF6', // Purple
    light: '#FFFFFF', // White
  },
}: GenerateQROptions): Promise<string> => {
  try {
    // The URL that will be embedded in the QR code
    // In a real app, this would point to your API or frontend route
    const url = `${window.location.origin}/qr/${userId}${missionId ? `/${missionId}` : ''}`;
    
    const options = {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin,
      color,
      width: size,
    };
    
    return await QRCode.toDataURL(url, options);
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    throw error;
  }
};
