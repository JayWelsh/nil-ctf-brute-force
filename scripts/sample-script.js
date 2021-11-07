// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const BigNumber = require('bignumber.js');
const Web3 = require('web3');
const fs = require('fs')
var path = require('path');

const web3 = new Web3();

BigNumber.config({ EXPONENTIAL_AT: 100 });

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const CTF = await hre.ethers.getContractFactory("CTF");
  const ctf = await CTF.deploy();

  await ctf.deployed();

  let alphabet = "abcdefghijklmnopqrstuvwxyz";

  let outputs = {};

  for (let letter1 of alphabet) {
    if(letter1 === 'd') {
      for(let letter2 of alphabet) {
        let tx = await ctf.retrieveLastWord(letter1, letter2);
        await tx.wait();
        let result = await ctf.getLastSeed();


        // console.log({result})
        let output;
        try {
          output = web3.utils.hexToUtf8(result);
          break;
        } catch (e) {
          output = web3.utils.hexToAscii(result);
        }
        console.log({output})
        let key = `${letter1} + ${letter2}`;
        outputs[key] = {text: output, hex: result};
      }
    }
  }

  console.log(outputs);

  let route = path.join(__dirname, '../data/', 'results-first-letter-d-only.json');
  fs.writeFileSync(route, JSON.stringify(outputs, null, 4), err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  })

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
