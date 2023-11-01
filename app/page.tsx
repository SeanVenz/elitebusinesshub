'use client'
import { useState } from 'react';
import { Navbar, Cards } from '@/components';

export default function Home() {
  const [wallet, setWallet] = useState<null | string>(null);

  const handleWalletConnect = (walletString: string) => {
    setWallet(walletString);
  };

  return (
    <main>
      <Navbar onWalletConnect={handleWalletConnect} />
      <Cards wallet={wallet} />
    </main>
  );
}
