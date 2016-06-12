#!/bin/bash
SOLC=`which solc`

echo "Initializing genesis block..."
geth init res/genesis.json

if [ $# = 1 ] && [ $1 = "quick" ] ; then
	 geth --password res/pass account new
	 nohup geth --rpc --rpcapi "web3, eth, miner, personal, admin" --mine --etherbase 0  \
	 --unlock 0 --password res/pass --solc $SOLC &> logs/geth.log &
else
	if [ ! -d ~/.ethereum ] || [ ! -f ~/.ethereum/keystore ]; then
		geth account new
	fi
	nohup geth --rpc --rpcapi "web3, eth, miner, personal, admin" --mine --etherbase 0  \
		--solc $SOLC &> logs/geth.log &
fi


touch logs/pids/$!
echo "Node running with process id $!."
echo "To connect interactively, run 'node run interactive'."