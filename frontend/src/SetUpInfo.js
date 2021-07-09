import React, { useState } from "react";
import * as fcl from "@onflow/fcl";


const SetUpInfo = () => {
  var [setUp, newSetUp] = useState(null)

  var setUp = async () => {
    var response = await fcl
      .send([
        fcl.transaction`
        import Pixori from 0xdb16a5e14c410280 

        transaction {

          prepare(acct: AuthAccount) {  
            let collection <- Pixori.createEmptyCollection()
            acct.save<@Pixori.Collection>(<-collection, to: /storage/NFTCollection)
            acct.link<&{Pixori.NFTReceiver}>(/public/NFTReceiver, target: /storage/NFTCollection)
          }
        }
        `,
        fcl.proposer(fcl.currentUser().authorization),
        fcl.payer(fcl.currentUser().authorization),
      ])

      var transaction = await fcl.tx(response).onceSealed()
      newSetUp(transaction)
      console.log(transaction)

  }


  return (
    <div className="token-data">
      <div className="setUp">
        <button className="setUp" onClick={setUp}>Set-up</button>
      </div>
    </div>
  );
}; 

export default SetUpInfo;
