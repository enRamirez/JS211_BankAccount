class BankAccount {
    constructor(accountNumber, owner) {
      this.accountNumber = accountNumber;
      this.owner = owner;
      this.transactions = [];
    }
    balance() {
      let currentBalance = 0;
      for (let item of this.transactions) {
        currentBalance += item.amount;
      }
      return currentBalance;
    }
    deposit(amt) {
      let newDeposit = new Transaction(amt, "Deposit");
      if (amt >= 0) {
        this.transactions.push(newDeposit);
      } else {
        console.log("Can't complete transaction");
      }
    }
    charge(payee, amt) {
      const currentBalance = this.balance();
      if (currentBalance >= amt) {
        let newCharge = new Transaction(amt * -1, payee);
        this.transactions.push(newCharge);
      } else {
        console.log(`Insufficent Funds`);
      }
    }
  }
  
  class Transaction {
    constructor(amount, payee) {
      this.payee = payee;
      this.amount = amount;
      this.date = new Date();
    }
  }
  
  const assert = require("assert");
  if (typeof describe === "function") {
    
    describe("Create an account", () => {
      it("should be able to create an account", () => {
        const John = new BankAccount(1234, "John Doe");
        assert.equal(John.owner, "John Doe");
        assert.equal(John.accountNumber, 1234);
      });
    });
    
    describe("Transaction class", () => {
      it("creates a transaction class", () => {
        const Charge1 = new Transaction(12.75, "Kevin Bacon");
        assert.equal(Charge1.payee, "Kevin Bacon");
        assert.equal(Charge1.amount, 12.75);
      });
    });
    
    describe("Account methods", () => {
      it("deposit should change balance", () => {
        const John = new BankAccount(1234, "John Doe");
        John.deposit(500);
        assert.equal(John.balance(), 500);
      });
      
      it("deposit should create a transaction", () => {
        const John = new BankAccount(1234, "John Doe");
        John.deposit(1000);
        assert.equal(John.transactions.length, 1);
      });
      
      it("charge should create a transaction", () => {
        const John = new BankAccount(1234, "John Doe");
        John.deposit(1500);
        John.charge("Test Charge", 1200);
        assert.equal(John.transactions.length, 2);
      });
    });
  }