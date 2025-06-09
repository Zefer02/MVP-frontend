import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Welcome to EthSocial</h1>
      <ConnectButton />
    </main>
  );
}
