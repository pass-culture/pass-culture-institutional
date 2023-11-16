echo "⬇ public_website dead code ⬇"
cd public_website
yarn test:deadcode

echo "-------"

echo "⬇ content_management_system dead code ⬇"
cd ../content_management_system
yarn test:deadcode
