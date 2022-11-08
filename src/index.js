web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var account;
web3.eth.getAccounts().then((f) => {
 account = f[0];
})

// update this application binary interface
const ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_partyId",
          "type": "uint256"
        }
      ],
      "name": "votedEvent",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "parties",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "partyName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "partiesCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_partyId",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_partyId",
          "type": "uint256"
        }
      ],
      "name": "getVote",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];


// update this contract address with your contract address
const address = "0xCBf8b2f56Cf8E0edDf7DAFa10A30B4F24A3E3122";

var myContract = new web3.eth.Contract(ABI, address);

parties = {1: "party-1", 2: "party-2", 3: "party-3"}

function voteForParty() {

 var partyId = $("#party").val();
 //console.log("Party id " + partyId);

 let div_id = parties[1];
 //console.log("div-id" + div_id)

 myContract.methods.vote(partyId).send({from: account}).then(function(error, result) {
    if (!error){
            contract.methods.getVote().call(partyId).then((f) => {
                $("#party-" + partyId).html(f);
               })
        }else{
            console.log(error); //  This part is returning an error g{} , no data inside.
        }
    })

    //$("#main").load("index.html #main" );

} //voteForParty()


$(document).ready(function() {

  setInterval(timingLoad, 3000);

  function timingLoad() {
    $('#main').load(location.href + " #main", function() {

      updateTableNo();
      updateTableParti();
    
      partyNames = Object.keys(parties);

      for(var i=0; i<partyNames.length; i++) {
      let partyIdNames = partyNames[i]; //name pulangkan nombor
      console.log("party id names " + partyIdNames);
      console.log(parties[partyIdNames]);

      myContract.methods.getVote(partyIdNames).call().then((f) => {
      $("#"+parties[partyIdNames]).html(f);
      })
      }//for
   }); //function timingLoad()
  } 
});   //$(document).ready(function()

function updateTableNo() {  

	for (let i = 1; i <= 3; i++) {
		myContract.methods.parties(i).call(function(error, result){
			if (error) {
				console.log(error, 'error')
			} else {
				console.log("party id : " + result[0], 'result');
				$('#no'+i).html(result[0]);
			}
		});
	} // for
}

function updateTableParti() {  

	for (let i = 1; i <= 3; i++) {
		myContract.methods.parties(i).call(function(error, result){
			if (error) {
				console.log(error, 'error')
			} else {
				//console.log(result[1], 'result');
				$('#no'+i+'-nama').html(result[1]);
			}
		});
	} // for
}