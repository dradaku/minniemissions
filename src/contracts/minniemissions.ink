
#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod minniemissions {
    use ink::storage::Mapping;
    use ink::prelude::vec::Vec;

    /// Structure to store the user's vibe points and other information
    #[derive(scale::Decode, scale::Encode, Debug, PartialEq, Eq, Copy, Clone)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout))]
    pub struct User {
        vibe_points: u64,
        missions_completed: u64,
        referral_count: u64,
        last_active: Timestamp,
    }

    /// The Minniemissions contract storage
    #[ink(storage)]
    pub struct Minniemissions {
        /// Owner of the contract
        owner: AccountId,
        /// Treasury account that receives a portion of funds
        treasury: AccountId,
        /// Artist account that receives a portion of funds
        artist: AccountId,
        /// Map from user AccountId to their User data
        users: Mapping<AccountId, User>,
        /// Total vibe points in the system
        total_vibe_points: u64,
        /// Treasury fee percentage (in basis points, e.g., 500 = 5%)
        treasury_fee: u32,
        /// Artist fee percentage (in basis points, e.g., 6000 = 60%)
        artist_fee: u32,
    }

    /// Events emitted by the contract
    #[ink(event)]
    pub struct MissionCompleted {
        #[ink(topic)]
        user: AccountId,
        mission_id: u64,
        vibe_points: u64,
    }

    #[ink(event)]
    pub struct RewardPaid {
        #[ink(topic)]
        user: AccountId,
        amount: Balance,
    }

    /// Errors that can occur during contract execution
    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        NotOwner,
        InvalidFeePercentage,
        InsufficientFunds,
        UserNotFound,
    }

    impl Minniemissions {
        /// Constructor to initialize the contract
        #[ink(constructor)]
        pub fn new(treasury: AccountId, artist: AccountId, treasury_fee: u32, artist_fee: u32) -> Self {
            let owner = Self::env().caller();
            
            // Validate fee percentages
            if treasury_fee + artist_fee > 10000 {
                panic!("Fee percentages must sum to less than 100%");
            }
            
            Self {
                owner,
                treasury,
                artist,
                users: Mapping::default(),
                total_vibe_points: 0,
                treasury_fee,
                artist_fee,
            }
        }

        /// Add vibe points to a user for completing a mission
        #[ink(message)]
        pub fn add_vibe_points(&mut self, user: AccountId, mission_id: u64, points: u64) -> Result<(), Error> {
            // Only the owner can add vibe points
            if self.env().caller() != self.owner {
                return Err(Error::NotOwner);
            }
            
            // Get the user or create a new one
            let mut user_data = self.users.get(user).unwrap_or(User {
                vibe_points: 0,
                missions_completed: 0,
                referral_count: 0,
                last_active: self.env().block_timestamp(),
            });
            
            // Update user data
            user_data.vibe_points += points;
            user_data.missions_completed += 1;
            user_data.last_active = self.env().block_timestamp();
            
            // Update storage
            self.users.insert(user, &user_data);
            self.total_vibe_points += points;
            
            // Emit event
            self.env().emit_event(MissionCompleted {
                user,
                mission_id,
                vibe_points: points,
            });
            
            Ok(())
        }

        /// Get a user's vibe points
        #[ink(message)]
        pub fn get_vp(&self, user: AccountId) -> u64 {
            self.users.get(user).map_or(0, |u| u.vibe_points)
        }

        /// Get total vibe points in the system
        #[ink(message)]
        pub fn get_total_vp(&self) -> u64 {
            self.total_vibe_points
        }

        /// Update the treasury account (admin only)
        #[ink(message)]
        pub fn update_treasury(&mut self, new_treasury: AccountId) -> Result<(), Error> {
            if self.env().caller() != self.owner {
                return Err(Error::NotOwner);
            }
            self.treasury = new_treasury;
            Ok(())
        }

        /// Update the artist account (admin only)
        #[ink(message)]
        pub fn update_artist(&mut self, new_artist: AccountId) -> Result<(), Error> {
            if self.env().caller() != self.owner {
                return Err(Error::NotOwner);
            }
            self.artist = new_artist;
            Ok(())
        }

        /// Update fee percentages (admin only)
        #[ink(message)]
        pub fn update_fees(&mut self, treasury_fee: u32, artist_fee: u32) -> Result<(), Error> {
            if self.env().caller() != self.owner {
                return Err(Error::NotOwner);
            }
            
            if treasury_fee + artist_fee > 10000 {
                return Err(Error::InvalidFeePercentage);
            }
            
            self.treasury_fee = treasury_fee;
            self.artist_fee = artist_fee;
            Ok(())
        }

        /// Split payment to distribute funds among artist, treasury, and fan
        #[ink(message, payable)]
        pub fn split_payment(&mut self, fan: AccountId) -> Result<(), Error> {
            let payment_amount = self.env().transferred_value();
            if payment_amount == 0 {
                return Err(Error::InsufficientFunds);
            }
            
            // Get the user or return error
            let user = self.users.get(fan).ok_or(Error::UserNotFound)?;
            
            // Calculate fee amounts
            let treasury_amount = payment_amount * self.treasury_fee as u128 / 10000;
            let artist_amount = payment_amount * self.artist_fee as u128 / 10000;
            let fan_amount = payment_amount - treasury_amount - artist_amount;
            
            // Transfer funds
            self.env().transfer(self.treasury, treasury_amount).expect("Transfer to treasury failed");
            self.env().transfer(self.artist, artist_amount).expect("Transfer to artist failed");
            self.env().transfer(fan, fan_amount).expect("Transfer to fan failed");
            
            // Emit event
            self.env().emit_event(RewardPaid {
                user: fan,
                amount: fan_amount,
            });
            
            Ok(())
        }

        /// Record a referral
        #[ink(message)]
        pub fn record_referral(&mut self, referrer: AccountId, bonus_points: u64) -> Result<(), Error> {
            if self.env().caller() != self.owner {
                return Err(Error::NotOwner);
            }
            
            // Get the user or create a new one
            let mut user_data = self.users.get(referrer).unwrap_or(User {
                vibe_points: 0,
                missions_completed: 0,
                referral_count: 0,
                last_active: self.env().block_timestamp(),
            });
            
            // Update referral count and add bonus points
            user_data.referral_count += 1;
            user_data.vibe_points += bonus_points;
            user_data.last_active = self.env().block_timestamp();
            
            // Update storage
            self.users.insert(referrer, &user_data);
            self.total_vibe_points += bonus_points;
            
            Ok(())
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;
        use ink::env::{test, DefaultAccounts};

        fn default_accounts() -> DefaultAccounts<ink::env::DefaultEnvironment> {
            test::default_accounts::<ink::env::DefaultEnvironment>()
        }

        fn set_sender(sender: AccountId) {
            test::set_caller::<ink::env::DefaultEnvironment>(sender);
        }

        #[ink::test]
        fn constructor_works() {
            let accounts = default_accounts();
            set_sender(accounts.alice);
            
            let contract = Minniemissions::new(accounts.bob, accounts.charlie, 1000, 6000);
            
            assert_eq!(contract.owner, accounts.alice);
            assert_eq!(contract.treasury, accounts.bob);
            assert_eq!(contract.artist, accounts.charlie);
            assert_eq!(contract.treasury_fee, 1000); // 10%
            assert_eq!(contract.artist_fee, 6000);   // 60%
        }

        #[ink::test]
        fn add_vibe_points_works() {
            let accounts = default_accounts();
            set_sender(accounts.alice);
            
            let mut contract = Minniemissions::new(accounts.bob, accounts.charlie, 1000, 6000);
            
            // Add vibe points as the owner
            assert_eq!(contract.add_vibe_points(accounts.django, 1, 100), Ok(()));
            assert_eq!(contract.get_vp(accounts.django), 100);
            
            // Try to add vibe points as non-owner
            set_sender(accounts.django);
            assert_eq!(contract.add_vibe_points(accounts.django, 2, 50), Err(Error::NotOwner));
        }

        #[ink::test]
        fn get_vp_works() {
            let accounts = default_accounts();
            set_sender(accounts.alice);
            
            let mut contract = Minniemissions::new(accounts.bob, accounts.charlie, 1000, 6000);
            
            // Initially zero
            assert_eq!(contract.get_vp(accounts.django), 0);
            
            // After adding points
            contract.add_vibe_points(accounts.django, 1, 100).unwrap();
            assert_eq!(contract.get_vp(accounts.django), 100);
            
            // Add more points
            contract.add_vibe_points(accounts.django, 2, 50).unwrap();
            assert_eq!(contract.get_vp(accounts.django), 150);
        }
    }
}
