FILES="day-1/part-1.ts
day-1/part-2.ts
day-2/part-1.ts
"

for f in $FILES; do
  npx ts-node ./src/$f
done
