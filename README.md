# On-Chain Color Storage dApp (Flare Coston2)

## Contract Address

- `0xd659553678bFbBB76a23e68176caD74039de47DF`  
- Explorer: https://coston2-explorer.flare.network/address/0xd659553678bFbBB76a23e68176caD74039de47DF

## Description

This project is a minimal, production-ready example of how to integrate a smart contract with a modern React/Next.js front end using `wagmi` and `viem`.

The underlying smart contract is a simple **Color** contract that stores a single string value representing a color. It exposes:

- `getColor()` – a read-only function that returns the current color.
- `setColor(string _color)` – a transaction that updates the on-chain color.
- `ColorChanged(address by, string newColor)` – an event emitted whenever the color is updated.

The front end provides a wallet-gated interface that lets users:

1. Connect their wallet on the Flare Coston2 network.
2. Read the current color stored in the contract.
3. Submit a transaction to update the color.
4. Track transaction status from submission through confirmation, including any errors.

This makes the project an ideal reference for building more complex dApps that require reading and writing contract state with proper UX around loading, error handling, and transaction feedback.

## Features

- **Flare Coston2 Integration**
  - Targets a specific contract deployed at `0xd659553678bFbBB76a23e68176caD74039de47DF`.
  - Uses the Coston2 explorer link for convenient contract inspection and debugging.

- **Wallet Gating**
  - All interactions are gated behind `wagmi`’s `useAccount` hook.
  - If the user is not connected, the UI clearly prompts them to connect their wallet before interacting with the contract.

- **Typed Contract Hook**
  - `useColorContract` encapsulates:
    - Reading the current color via `getColor`.
    - Writing to the contract via `setColor`.
    - Tracking transaction hash, pending/confirming states, and errors.
  - Strong TypeScript typings for contract data, actions, and state.

- **User-Friendly UI**
  - Displays the **current color** as text.
  - Renders a **live preview box** that uses the current color as a CSS color (e.g. `red`, `#ff0000`, `rgb(255,0,0)`).
  - Provides an input field for entering a new color and a clear call-to-action button to update it.

- **Robust Loading & Error States**
  - Unified loading indicator derived from:
    - Local action state (`isLoading`),
    - `wagmi` write state (`isPending`),
    - Transaction confirmation state (`isConfirming`).
  - Detailed transaction status card:
    - Shows the transaction hash.
    - Indicates when the transaction is waiting for confirmation.
    - Confirms when the transaction has been successfully mined.
  - Error card that surfaces any `wagmi` write errors with a readable message.

- **Clean Separation of Concerns**
  - Contract logic is isolated in `lib/contract.ts` (address and ABI).
  - Read/write and state management are handled in `hooks/useContract.ts`.
  - Presentation and UX logic live in `components/sample.tsx`.

## How It Solves

### Problem

When building on new networks or experimenting with smart contracts, developers often need:

- A **simple reference dApp** that demonstrates how to:
  - Connect a wallet.
  - Read on-chain state.
  - Send typed transactions.
  - Handle loading, confirmation, and errors gracefully.
- A **clean architecture** showing how to separate contract configuration, hooks, and UI.
- A **minimal but realistic example** that can be easily extended into more complex applications.

Without such a reference, teams frequently re-solve the same problems—wiring up wagmi, managing transaction state, and building basic UX around contract calls.

### Solution

This project addresses those needs by providing:

1. **A Minimal Yet Complete Contract Integration**
   - Uses a very simple contract (just `getColor` and `setColor`) so the focus remains on **integration patterns**, not complex business logic.
   - Demonstrates how to structure and export contract address and ABI in a reusable way.

2. **A Reusable, Composable Hook (`useColorContract`)**
   - Encapsulates all common concerns:
     - Reading from the contract.
     - Writing to the contract.
     - Tracking confirmation status and exposing a unified `state` object.
   - Can be used as a template for other hooks (e.g., `useTokenContract`, `useRegistryContract`) by swapping out the ABI and function names.

3. **Clear UX for Transaction Lifecycles**
   - In a single screen, developers and users can see:
     - The current value on-chain.
     - A way to submit a new transaction.
     - The live status of that transaction until it confirms.
   - This mirrors the flow of more complex dApps, making the example directly applicable to real-world projects.

4. **Educational and Extensible Use Cases**
   - **Learning Tool**: Ideal for developers new to Flare Coston2, `wagmi`, or contract integrations.
   - **Starter Template**: Can be forked and extended into:
     - Settings dashboards (other simple string/enum values).
     - Profile or theme configuration stored on-chain.
     - Demo dApps showcasing contract events and UI reactions.
   - **Debugging & Testing**: Because the contract logic is trivial, it’s easy to verify that:
     - The network configuration is correct.
     - Wallet connections and signatures work.
     - Transaction confirmations are being tracked correctly.

By combining a simple smart contract with a well-structured React/wagmi front end, this project gives you a clear, practical starting point for building richer on-chain experiences on top of the contract at
`0xd659553678bFbBB76a23e68176caD74039de47DF`.
