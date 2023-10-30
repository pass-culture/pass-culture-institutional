echo "⬇ frontend dead code ⬇"
cd frontend
yarn test:deadcode

echo "-------"

echo "⬇ backend dead code ⬇"
cd ../backend
yarn test:deadcode
