import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { Transaction, SystemProgram, PublicKey } from "@solana/web3.js";
import { FC, useState } from "react";
import styles from "../styles/Home.module.css";

const PROGRAM_ID = "4QKU2dkXGRTGFbR5e5tDQFitFrjVXLnWuKN71iHrZRBo";
const program = new PublicKey(PROGRAM_ID);

export const SendSolForm: FC = () => {
  const [txSig, setTxSig] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  const interactWithProgram = async (event) => {
    event.preventDefault();
    if (!connection || !publicKey) {
      return;
    }

    const recipientPubKey = new PublicKey(event.target.pricefeedid.value);
    const transaction = new Transaction();

    // Assuming you have a method named 'fetchPrice' in your Solana program
    const data = Buffer.from("fetchPrice"); // Replace with your actual method data
    const instruction = new web3.TransactionInstruction({
      keys: [
        { pubkey: publicKey, isSigner: true, isWritable: true },
        { pubkey: recipientPubKey, isSigner: false, isWritable: true },
      ],
      programId: program,
      data: data,
    });

    transaction.add(instruction);
    transaction.feePayer = publicKey;

    sendTransaction(transaction, connection).then((sig) => {
      setTxSig(sig);
    });

    // Send the transaction
    // const signature = await sendTransaction(transaction, connection);
    // setTxSig(signature);
  };

  return (
    <div>
      {publicKey ? (
        <form onSubmit={interactWithProgram} className={styles.form}>
          <label htmlFor="symbol">Symbol</label>
          <input
            id="symbol"
            type="text"
            name="symbol"
            className={styles.formField}
            placeholder="SOL"
            required
          />
          <br />
          <label htmlFor="pricefeedid">Price Feed ID</label>
          <input
            id="pricefeedid"
            type="text"
            name="pricefeedid"
            className={styles.formField}
            placeholder="2iRhuHfXDLmSqxSDo2Gyv59ZMaPDkensHHF2cJwWhaqW"
            required
          />
          <br />
          <button type="submit" className={styles.formButton}>
            Send
          </button>
        </form>
      ) : (
        <span>Connect a Wallet to Proceed</span>
      )}
      {txSig ? (
        <div>
          <p>View your transaction on </p>
          <a href={link()}>Solana Explorer</a>
        </div>
      ) : null}
    </div>
  );
};
