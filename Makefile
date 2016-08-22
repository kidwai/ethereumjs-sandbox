all:
	solc --combined-json bin,abi contracts/*.sol > contracts/interfaces.json;
	sed -i "s/{\"contracts\"://" contracts/interfaces.json
	cat contracts/interfaces.json | cut -d ',' -f 1-`grep , -o contracts/interfaces.json | wc -l` > /tmp/interfaces.json
	cat /tmp/interfaces.json > contracts/interfaces.json
use-js:
	node -e "require('./utils/build.js')()"

clean:
	rm contracts/interfaces.json
