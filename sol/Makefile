all:
	solc --combined-json abi,bin *.sol > ../cache/interfaces.json
	sed -i 's/contracts/interfaces/' ../cache/interfaces.json

clean:
	rm ../cache/interfaces.json
