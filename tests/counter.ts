import { assert } from 'chai';
import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Counter } from '../target/types/counter';

const { SystemProgram } = anchor.web3;

describe("counter", () => {
    // configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

  const program = anchor.workspace.Counter as Program<Counter>;
  let _baseAccount: anchor.web3.Keypair;

  it("Is initialized!", async () => {
    // Add your test here.
    // const tx = await program.methods.initialize().rpc();
    // console.log("Your transaction signature", tx);
    const myAccount = anchor.web3.Keypair.generate();

    const tx = await program.rpc.initialize({
      accounts:{
        myAccount:myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers:[myAccount]
    });

    //Fetch newly created account from cluster
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    assert.equal(account.data.toString(), "0");
    _baseAccount=myAccount;
  });

  it("Set the value",async () =>{
    const myAccount=_baseAccount;

    await program.rpc.set(new anchor.BN(10),{
      accounts:{
        myAccount:myAccount.publicKey,
      }
    });
    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    assert.ok(account.data.eq(new anchor.BN(10)))
    _baseAccount=myAccount;
  });

  it("increment",async () =>{
    const myAccount=_baseAccount;

    await program.rpc.increment({
      accounts:{
        myAccount:myAccount.publicKey,
      }
    });
    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    assert.ok(account.data.eq(new anchor.BN(11)))
    _baseAccount=myAccount;
  });

  it("decrement",async () =>{
    const myAccount=_baseAccount;

    await program.rpc.decrement({
      accounts:{
        myAccount:myAccount.publicKey,
      }
    });
    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    assert.ok(account.data.eq(new anchor.BN(10)))
    _baseAccount=myAccount;
  });
});
