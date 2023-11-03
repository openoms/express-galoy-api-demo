import QRCode from "qrcode";

/**
 * Generates a QR code from a given string and returns it as a data URL.
 * @param {string} text The text to encode in the QR code.
 * @returns {Promise<string>} A promise that resolves to the QR code as a data URL.
 */
export const generateQRCode = async (text: string): Promise<string> => {
  try {
    // Generate the QR code
    const qrCodeDataURL = await QRCode.toDataURL(text, {
      errorCorrectionLevel: "H",
      type: "image/png",
      margin: 1,
      width: 400,
    });
    return qrCodeDataURL; // Return the data URL string directly
  } catch (err) {
    // Handle any errors that occur during QR code generation
    console.error("Error generating QR Code:", err);
    throw err;
  }
};
