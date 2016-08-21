all:
	solc --combined-json bin,abi *.sol > interfaces.json;
	sed -i "s/{\"contracts\"://" interfaces.json
	cat interfaces.json | cut -d ',' -f 1-`grep , -o interfaces.json | wc -l` > /tmp/interfaces.json
	cat /tmp/interfaces.json > interfaces.json

clean:
	rm interfaces.json
