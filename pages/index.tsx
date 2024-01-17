import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import WalletContextProvider from "../components/WalletContextProvider";
import { AppBar } from "../components/AppBar";
import { BalanceDisplay } from "../components/BalanceDisplay";
import { SendSolForm } from "../components/SendSolForm";
import { BuildWith } from "../components/BuiltWith";
import Head from "next/head";

const Home: NextPage = (props) => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Solana Bootcamp 23Q4 Project</title>
        <meta name="description" content="Solana Bootcamp 23Q4 Project" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <BuildWith />
          <BalanceDisplay />
          <SendSolForm />
        </div>
      </WalletContextProvider>
    </div>
  );
};

export default Home;
