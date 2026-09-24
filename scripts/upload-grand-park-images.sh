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

echo "Uploaded Grand Park images to r2://${BUCKET}/grand-park/"
