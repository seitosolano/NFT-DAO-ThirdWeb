import sdk from "./initialize-sdk.js";
import { ethers } from "ethers";

const vote = sdk.getVote("0x09fE8B308F78bE6aAB795f6d51622326239be84E"/*"0x31c5840b31A1F97745bDCbB1E46954b686828E0F"*/);

const token = sdk.getToken("0xa0E3df5969ba5C424a59A2395A8fc804C47b64c4"/*0x6eefd78C9C73505AA71A13FeE31D9718775c9086"*/);

(async () => {
  try {
    const amount = 420_000;
    const description =
      "Should the DAO mint an additional " +
      amount +
      " tokens into the treasury?";
    const executions = [
      {
        toAddress: token.getAddress(),
        nativeTokenValue: 0,
        transactionData: token.encoder.encode("mintTo", [
          vote.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
        ]),
      },
    ];

    await vote.propose(description, executions);
    console.log("✅ Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }
})();
