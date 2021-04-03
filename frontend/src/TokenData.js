import React, { useState } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"


var TokenData = () => {
  var [nftInfo, setNftInfo] = useState(null)

  var fetchTokenData = async () => {
    var encoded = await fcl
      .send([
        fcl.script`
        import Pixori from 0xdb16a5e14c410280
        
        pub fun main(address: Address) : {String : String} {
        
            let nftOwner = getAccount(address)
            let capability = nftOwner.getCapability<&{Pixori.NFTReceiver}>(/public/NFTReceiver)

            let receiverRef = capability.borrow()
                ?? panic("Could not borrow the receiver reference")
            return receiverRef.getMetadata(id: 1)
        }
      `,
      fcl.args([
        fcl.arg(user.addr(), t.Address), 
      ]),
      ])
    
    var decoded = await fcl.decode(encoded)
    setNftInfo(decoded)
  };



  return (
    <div className="token-data">
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

export default TokenData;

