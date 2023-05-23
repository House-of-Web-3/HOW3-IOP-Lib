# Domain Interoperability Protocol (DIP)
    Docs for DIP.
# Introduction
Domain Interoperability Protocol is a protocol that provides a certificate of ownership to the trusted owners of the domain name and TLDs. It ensures that the duplicates of the domain names and TLDs can be recognized and entrusts the ownership certificate holder of the domain name and TLD.

# Installation

Installation process for DIP js library.

    npm i how3-dip
    
    https://github.com/House-of-Web-3/HOW3-IOP-Lib

# How it works

Working of DIP.

Domain Interoperability Protocol provides three sets of functions:

    Search:
        Search domain names and TLDs around different blockchains and domain name services and show availability and owner of unavailable domain names or TLDs.

    Verify:
        It verifies the owner of the domain name or TLD by exploring on-chain data.
        
    Register:
        The register function is used to register a certificate of ownership on Binance Smart Chain. It generates a certificate NFT for the domain name owner. It is similar to the blue tick on Twitter but for domain names.

# Code example
Example snippets of code

Search:

This code search for the availability of the domain name and TLD and determines the owner of the unavailable domain name or TLD.

Input param:
Domain name -> [String] example - “vitalik.eth”
Code snippet:
    '''
        const { HOW3Protocol } = require("./lib/index.js");
        async function check() {
               console.log(await HOW3Protocol.isAvailable("vitalik.eth"));
        }

     '''

# Register
This code verifies and registers a new certificate of ownership for the owner of the specific domain name and TLD.

Input param:
Domain name -> [String] example - “vitalik.eth”
Owner’s address -> [String] example - “0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045”
Private Key -> [String] example - “55904db11601d3d9e701b6cc2e67f6xxxxxxxxxxxxxxxxx”
Code snippet:
    '''
        const { HOW3Protocol } = require("./lib/index.js");
        async function check2() {
             console.log(await HOW3Protocol.register(
                        "pptechno52.nft",
                        "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                        "55904db11601d3d9e701b6cc2e67f6xxxxxxxxxxxxxxxxx"
              ));
        }

     '''

# Functions

Functions provided by DIP library.

    Search:

    Search domain names and TLDs around different blockchains and domain name services and show availability and owner of unavailable domain names or TLDs.

    Add your domain service:

    You can add your domain name service details to enable the search function for your registered domain names. This service is available only by applying your request at team@how3.me.

    Register using DIP library:

    You can register your certificate of ownership using our library. For that, you will need to provide the Metamask private key to make the transaction on Binance Smart Chain.

    Register using Metamask:

    You can register your certificate of ownership from our website  using Metamask extension.

    Transfer using Hardhat:

    You can transfer your certificate to some other address using Hardhat command line tools. 
    '''
        TransferFrom({OwnersAddress},{RecieversAddress},{TokenID})
    '''

    Transfer using Metamask:

    You can transfer your certificate by simply sending it like an NFT using Metamask.

    Renew using Hardhat:

    Renew your certificate using Hardhat command line tools.
    '''
        renewDomainName({0xdomainName_in_bytes})
    '''

# Verify your certificate

Verification process.

You can verify your certificate of ownership by checking BSC scan.
https://bscscan.com/tx/{your-transaction-hash}

# Future scope

Describes future scope of project.

Complete decentralization of protocol using LayerZero.
Automated addition of new domain name service in search and verification functions.
Expanding and scaling for all major blockchains.
