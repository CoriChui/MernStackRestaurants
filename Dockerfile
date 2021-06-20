FROM mongo
COPY dataset.json /dataset.json
CMD mongoimport --host mongodb --db test --collection dataset --type=json --file /dataset.json