const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const getWeb3 = (url, privateKeys) => {
  const provider = new HDWalletProvider(privateKeys, url);
  const web3 = new Web3(provider);

  return web3;
};

const escrowABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "payee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weiAmount",
        type: "uint256",
      },
    ],
    name: "Deposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "payee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weiAmount",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "payee", type: "address" }],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "payee", type: "address" }],
    name: "depositsOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "payee", type: "address" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const escrowBytecode =
  "60806040523480156100115760006000fd5b505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b61005a565b6107a6806100696000396000f3fe6080604052600436106100385760003560e01c806351cff8d91461003e578063e3a9db1a14610091578063f340fa01146100f857610038565b60006000fd5b34801561004b5760006000fd5b5061008f600480360360208110156100635760006000fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061013d565b005b34801561009e5760006000fd5b506100e2600480360360208110156100b65760006000fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610468565b6040518082815260200191505060405180910390f35b61013b6004803603602081101561010f5760006000fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104bc565b005b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610205576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281526020015060200191505060405180910390fd5b6000600160005060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054905080600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163110151515610303576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f416464726573733a20696e73756666696369656e742062616c616e636500000081526020015060200191505060405180910390fd5b6000600160005060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005081909090555060008273ffffffffffffffffffffffffffffffffffffffff1682604051808050600001905060006040518083038185875af1925050503d80600081146103b2576040519150601f19603f3d011682016040523d82523d6000602084013e6103b7565b606091505b50509050801515610413576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603a815260200180610737603a913960400191505060405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff167f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5836040518082815260200191505060405180910390a250505b5b50565b6000600160005060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490506104b7565b919050565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610584576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281526020015060200191505060405180910390fd5b6000349050600081600160005060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054019050600160005060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050548110151515610695576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081526020015060200191505060405180910390fd5b80600160005060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000508190909055508273ffffffffffffffffffffffffffffffffffffffff167f2da466a7b24304f47e87fa2e1e5a81b9831ce54fec19055ce277ca2f39ba42c4836040518082815260200191505060405180910390a250505b5b5056fe416464726573733a20756e61626c6520746f2073656e642076616c75652c20726563697069656e74206d61792068617665207265766572746564a26469706673582212204b4033bac822b96f15788b1a8ee8092d84bcc776b1a95ad13bbcd1e0dd41ae1c64736f6c63430006060033";

const deploy = async (web3, deployerIndex) => {
  const accounts = await web3.eth.getAccounts();
  const deployer = accounts[deployerIndex];
  const options = { gas: "1000000", from: deployer };

  const escrowContract = await new web3.eth.Contract(escrowABI);

  return escrowContract
    .deploy({
      data: escrowBytecode,
      arguments: [], // empty as the constructor in our Escrow contract has no arguments
    })
    .send(options, function (err, transactionHash) {
      if (err) {
        throw new Error("failed to send:", err);
      }

      console.log("Contract deployment transactionHash: " + transactionHash);
    })
    .then(function (contract) {
      console.log("Contract address: " + contract.options.address);
      return contract;
    }) // chaining
    .catch(function (err) {
      throw new Error(err);
    });
};

const testContractMethods = (escrowInstance) => {
  return async function (web3, deployerIndex, recipientIndex) {
    try {
      const accounts = await web3.eth.getAccounts();
      const deployer = accounts[deployerIndex];
      const recipient = accounts[recipientIndex];

      let balance = await escrowInstance.methods.depositsOf(recipient).call();
      console.log(`Amount before deposit: ${balance}`);

      const payment = "9603064";
      let txHash = await escrowInstance.methods
        .deposit(recipient)
        .send({ value: payment, from: deployer });
      console.log(`Transaction hash for deposit(): ${txHash}`);

      balance = await escrowInstance.methods.depositsOf(recipient).call();
      console.log(`Amount after deposit: ${balance}`);

      txHash = await escrowInstance.methods
        .withdraw(recipient)
        .send({ from: deployer });
      console.log(`Transaction hash for withdraw(): ${txHash}`);
    } catch (err) {
      console.error(err);
    }
  };
};

const infura_url =
  "https://ropsten.infura.io/v3/fdca16df500143c0ac0024ab48a45bc6";
// populate this with what is generated from `npm run create-accounts`
const privateKeys = [
  "0x59b675a6c5c5091499cb51dac440c6284074169227a8571cbac4cf4473c014b0",
  "0x91ee44c89d093614b61f80fe4845ab952f17c05f91b507199e4650dd8526f765",
  "0x6bc1a8842676310b11d132fda9c8a75463728c4112eef246f9425faae6b7edef",
];

const web3 = getWeb3(infura_url, privateKeys);
const deployerIndex = 0;
const recipientIndex = 1;

deploy(web3, deployerIndex)
  .then((newContractInstance) => {
    // currying
    return testContractMethods(newContractInstance)(
      web3,
      deployerIndex,
      recipientIndex
    );
  })
  .catch((err) => {
    console.error(err);
  });
