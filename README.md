# SolanaDevCounter
Creating a counter application on Solana blockchain

Environment used
- Used localnet to create and deploy this counter application

Steps to run and test the application

1. Enter the main directory
2. yarn install
3. anchor build
4. You will get a command in output similar to (solana address -k target/deploy/projectname-keypair.json). Copy it
5. Run solana-test-validator in a seperate tab. (After that, make sure you have some sol. Check using solana balance. Also use airdrop to add balance)
6. Paste the copied command. This bassically creates program address and displays it in terminal
7. Copy and paste that programid in declare_id!() macro of /programs/counter/src/lib.rs and also in Anchor.toml file counter variable
8. anchor deploy
9. Stop the solana-test-validator with Ctrl+C which is running in the other tab
10. anchor test

![image](https://user-images.githubusercontent.com/104249034/165594090-6c0fa9ba-188c-4f1a-83c7-762f88f0e153.png)
