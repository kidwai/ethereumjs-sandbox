#!/bin/bash

for pid in `ls ./logs/pids`
do 
	kill -9 $pid &> /dev/null
	rm ./logs/pids/$pid &> /dev/null
done


if [[ ${#} == 1 && ${1} = "reset" ]]; then
	rm -rf ~/.ethereum ~/.web3 ./logs/geth.log &> /dev/null;
fi