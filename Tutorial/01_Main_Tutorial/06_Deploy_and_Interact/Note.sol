// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

/*
    -> npx hardhat node (run hardhat blockchain node)
    -> Now open a new console
    *) Deploying using hardhat
        -> we will create file 'scripts/deploy.js'
        -> after writing script to deploy smart contract we will run this:
            -> npx hardhat run scripts/deploy.js (deployed on default network)
            -> npx hardhat run --netowrk localhost scripts/deploy.js (deployed on localhost network)

    *) Console:
        -> hardhat console help to do interact with smart-contract
        -> npx hardhat console --network localhost (to open interactive javascript environment to interact with smart contract on localhost blockchain)
        -> to get the contract instance:
                -> const contractArtifact = await artifacts.readArtifact("<contract_name>");
                -> const contract = new ethers.Contract("<contract_address>", contractArtifact.abi, ethers.provider);
            -> OR:
                -> let contract = await ethers.getContractAt("<contract_name>","<contract_address>");
            -> OR:
                const Contract = await ethers.getContractFactory("<contract_name>");
                const contract = await Evote.attach("<contract_address>");
        
        -> to call the contract function:
            -> const <return_function_name> = await contract.<function_name>(<arguments>);
*/