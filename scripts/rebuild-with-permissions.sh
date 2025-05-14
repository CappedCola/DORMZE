#!/bin/bash

# Script to rebuild the app with updated permissions
# Run this script from the project root with: sh scripts/rebuild-with-permissions.sh

# Set text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}============================================${NC}"
echo -e "${CYAN}DORMZE APP REBUILD WITH PERMISSIONS${NC}"
echo -e "${CYAN}============================================${NC}"

# Step 1: Verify the permissions are in app.json
echo -e "\n${YELLOW}Step 1: Verifying app.json permissions...${NC}"
if grep -q "NSPhotoLibraryUsageDescription" app.json; then
  echo -e "${GREEN}✓ Photo library permission description found in app.json${NC}"
else
  echo -e "${RED}✗ Photo library permission description NOT found in app.json${NC}"
  echo "Please add the permission descriptions to app.json first."
  exit 1
fi

# Step 2: Launch the build
echo -e "\n${YELLOW}Step 2: Creating a new development build with updated permissions...${NC}"
echo -e "This will take some time. You'll need to log in to your Apple account.\n"
echo -e "${YELLOW}Starting build now...${NC}"
eas build --platform ios --profile development

# Step 3: Instructions for after the build
echo -e "\n${YELLOW}Step 3: After the build completes...${NC}"
echo -e "${GREEN}✓ Install the new build on your device using the QR code provided${NC}"
echo -e "${GREEN}✓ Start your development server with: npx expo start${NC}"
echo -e "${GREEN}✓ Connect your device by scanning the QR code${NC}"
echo -e "${GREEN}✓ Test the image picker functionality${NC}"

echo -e "\n${CYAN}============================================${NC}"
echo -e "${CYAN}BUILD PROCESS INITIATED${NC}"
echo -e "${CYAN}============================================${NC}" 