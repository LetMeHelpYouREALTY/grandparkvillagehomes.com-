#!/usr/bin/env bash
# Copy Grand Park Village Homes images into Cloudflare R2.
# Git keeps the same files under public/images as the backup.
set -euo pipefail

BUCKET="${GRAND_PARK_R2_BUCKET:-grandparkvillagehomes-images}"

upload() {
  local key="$1"
  local file="$2"
  local type="$3"
  echo "Uploading ${key}"
  npx wrangler r2 object put "${BUCKET}/${key}" \
    --file="${file}" \
    --content-type="${type}"
}

upload "grand-park/grand-park-village-hero.png" "public/images/neighborhoods/grand-park-village-hero.png" "image/png"
upload "grand-park/grand-park-central-park.png" "public/images/neighborhoods/grand-park-central-park.png" "image/png"
upload "grand-park/grand-park-single-family.png" "public/images/neighborhoods/grand-park-single-family.png" "image/png"
upload "grand-park/grand-park-townhomes.png" "public/images/neighborhoods/grand-park-townhomes.png" "image/png"
upload "grand-park/grand-park-village-mark.png" "public/images/logos/grand-park-village-mark.png" "image/png"
upload "grand-park/grand-park-village-homes.svg" "public/images/logos/grand-park-village-homes.svg" "image/svg+xml"
upload "grand-park/dr-jan-duffy-grand-park-circle.png" "public/images/agent/dr-jan-duffy-grand-park-circle.png" "image/png"
upload "grand-park/dr-jan-duffy-west-summerlin-realtor.jpg" "public/images/agent/dr-jan-duffy-west-summerlin-realtor.jpg" "image/jpeg"
upload "grand-park/dr-jan-duffy-grand-park-village-homes-badge.jpg" "public/images/agent/dr-jan-duffy-grand-park-village-homes-badge.jpg" "image/jpeg"
upload "grand-park/favicon-32x32.png" "public/favicon-32x32.png" "image/png"
upload "grand-park/apple-touch-icon.png" "public/apple-touch-icon.png" "image/png"

echo "Uploaded Grand Park images to r2://${BUCKET}/grand-park/"
