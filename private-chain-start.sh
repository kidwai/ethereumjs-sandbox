#!/bin/bash

geth --rpc --rpcapi "web3,eth,miner,personal,admin,net,txpool" --networkid 123 --genesis res/genesis.json console