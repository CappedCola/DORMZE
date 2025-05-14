import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Modal,
} from 'react-native';

interface ManualImageInputProps {
  onImageAdded: (imageUrl: string) => void;
  isVisible: boolean;
  onClose: () => void;
  theme: any;
}

const ManualImageInput: React.FC<ManualImageInputProps> = ({
  onImageAdded,
  isVisible,
  onClose,
  theme,
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [isValidImage, setIsValidImage] = useState(false);

  const checkImageUrl = (url: string) => {
    if (!url) {
      setIsValidImage(false);
      return;
    }

    // Simple check to see if URL looks like an image URL
    const isImageUrl = /\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(url);
    setIsValidImage(isImageUrl);
  };

  const handleUrlChange = (text: string) => {
    setImageUrl(text);
    checkImageUrl(text);
  };

  const handleAddImage = () => {
    if (!imageUrl) {
      Alert.alert('Error', 'Please enter an image URL');
      return;
    }

    if (!isValidImage) {
      Alert.alert(
        'Warning',
        "This doesn't look like a valid image URL. Add anyway?",
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Add Anyway', onPress: () => confirmAddImage() },
        ]
      );
      return;
    }

    confirmAddImage();
  };

  const confirmAddImage = () => {
    onImageAdded(imageUrl);
    setImageUrl('');
    onClose();
  };

  const handlePreview = () => {
    if (!imageUrl) {
      Alert.alert('Error', 'Please enter an image URL first');
      return;
    }
    setPreviewVisible(true);
  };

  const usePlaceholder = () => {
    const placeholderUrl =
      'https://via.placeholder.com/400x400?text=Profile+Photo';
    setImageUrl(placeholderUrl);
    setIsValidImage(true);
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View
          style={[styles.modalContent, { backgroundColor: theme.background }]}
        >
          <Text style={[styles.title, { color: theme.text }]}>
            Add Image from URL
          </Text>

          <Text style={[styles.label, { color: theme.text }]}>Image URL:</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            value={imageUrl}
            onChangeText={handleUrlChange}
            placeholder="https://example.com/image.jpg"
            placeholderTextColor={theme.secondaryText}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={handlePreview}
            >
              <Text style={styles.buttonText}>Preview</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#666' }]}
              onPress={usePlaceholder}
            >
              <Text style={styles.buttonText}>Use Placeholder</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.error }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isValidImage ? theme.primary : '#999' },
              ]}
              onPress={handleAddImage}
              disabled={!imageUrl}
            >
              <Text style={styles.buttonText}>Add Image</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.note, { color: theme.secondaryText }]}>
            Tip: You can use any publicly accessible image URL
          </Text>
        </View>
      </View>

      {/* Image Preview Modal */}
      <Modal
        visible={previewVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPreviewVisible(false)}
      >
        <View style={styles.previewContainer}>
          <View
            style={[
              styles.previewContent,
              { backgroundColor: theme.background },
            ]}
          >
            <Text style={[styles.previewTitle, { color: theme.text }]}>
              Image Preview
            </Text>

            <Image
              source={{ uri: imageUrl }}
              style={styles.previewImage}
              resizeMode="contain"
              onError={() => {
                Alert.alert(
                  'Error',
                  'Unable to load image. The URL may be invalid.'
                );
                setPreviewVisible(false);
              }}
            />

            <TouchableOpacity
              style={[styles.previewButton, { backgroundColor: theme.primary }]}
              onPress={() => setPreviewVisible(false)}
            >
              <Text style={styles.buttonText}>Close Preview</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flex: 0.48,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  previewContent: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  previewImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  previewButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default ManualImageInput;
