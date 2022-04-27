use anchor_lang::prelude::*;

declare_id!("ETADTkKg9XhkeQLkRNZc7Pjwx64AX5FenSkCxRxSMNVV");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let my_account=&mut ctx.accounts.my_account;
        my_account.data = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let my_account=&mut ctx.accounts.my_account;
        my_account.data += 1;
        Ok(())
    }

    pub fn decrement(ctx: Context<Decrement>) -> Result<()> {
        let my_account=&mut ctx.accounts.my_account;
        my_account.data -= 1;
        Ok(())
    }

    pub fn set(ctx: Context<Set>, counter:i64) -> Result<()> {
        let my_account=&mut ctx.accounts.my_account;
        my_account.data = counter;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>

}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[derive(Accounts)]
pub struct Set<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}


#[account]
pub struct MyAccount{
    pub data:i64,
}

//Good practice is to define struct corresponding to that function so in future you can make changes
//Check idl file in target folder after build to get better idea
