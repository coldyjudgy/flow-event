import React, { useState } from "react";
import * as fcl from "@onflow/fcl";


var SetUpInfo = () => {
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
            log("Collection created for the user")

            acct.link<&{Pixori.NFTReceiver}>(/public/NFTReceiver, target: /storage/NFTCollection)
            log("Capability created")
          }
        }
        `,
        fcl.proposer(fcl.currentUser().authorization),
        fcl.payer(fcl.currentUser().authorization),
      ])

      var transaction = await fcl.tx(response).onceSealed()
      newSetUp(transaction)

  }
}

  return (
    <div className="token-data">
      <div className="setUp">
        <button className="setUp" onClick={setUp}>Set-up</button>
      </div>

      <div className="center">
        <button className="btn-primary" onClick={fetchTokenData}>Fetch Token Data</button>        
      </div>
      {
        nftInfo &&
        <div>
          {
            Object.keys(nftInfo).map(k => {
              return (
                <p>{k}: {nftInfo[k]}</p>
              )
            })
          }
            <div>
              <button onClick={() => setNftInfo(null)} className="btn-secondary">Clear Token Info</button>
            </div>
        </div>          
  
      }
    </div>
  );
};

export default SetUpInfo;

