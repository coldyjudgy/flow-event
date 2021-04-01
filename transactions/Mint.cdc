// flow transactions send --code Mint.cdc --signer admin-account

import Pixori from 0xdb16a5e14c410280 // set "0x02" as admin-account address

transaction {

    let receiverRef: &{Pixori.NFTReceiver}
    let minterRef: &Pixori.NFTMinter

    prepare(acct: AuthAccount) {

        self.receiverRef = acct.getCapability<&{Pixori.NFTReceiver}>(/public/NFTReceiver)
            .borrow()
            ?? panic("Could not borrow receiver reference")
        
        self.minterRef = acct.borrow<&Pixori.NFTMinter>(from: /storage/NFTMinter)
            ?? panic("could not borrow minter reference")
    }

    execute {

        let newNFT <- self.minterRef.mintNFT()

        // set "metadata" as a variable
        let metadata: {String: String} = {
            "name": "pixori",
            "team": "flow",
            "location": "seoul"
        }
        self.receiverRef.deposit(token: <-newNFT, metadata: metadata)

        log("NFT Minted and deposited to Admin's Collection")
    }
}