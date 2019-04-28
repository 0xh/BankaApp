import TransactionService from '../services/TransactionService';
import AccountService from '../services/AccountService';

class TransactionController {

  static async processTransaction(req, res) {
    let addedtransaction;
    let mydata;
    try {
      const transactionData = req.scafoldData;
      addedtransaction = await TransactionService.addNewTransaction(transactionData, res);
      mydata = {
        TransactionId: addedtransaction.id,
        accountNumber: req.params.accountNumber,
        accountBalance: addedtransaction.newbalance,
        amount: addedtransaction.amount,
        cashier: addedtransaction.cashier_id,
        Transactiontype: addedtransaction.type,
      };
    } catch (e) {
      addedtransaction = undefined;
    }
    res.status(addedtransaction === undefined ? 500 : 200).json({
      status: addedtransaction === undefined ? 500 : 200,
      data: addedtransaction === undefined ? undefined : mydata,
    });
  }

  static async getTransaction(req, res) {
    let addedtransaction;
    let mydata;
    try {
      addedtransaction = await TransactionService.getTransaction(req.params.id);
      if (addedtransaction !== undefined) {
        mydata = {
          TransactionId: addedtransaction.id,
          accountNumber: req.params.accountNumber,
          accountBalance: addedtransaction.newbalance,
          amount: addedtransaction.amount,
          cashier: addedtransaction.cashier_id,
          Transactiontype: addedtransaction.type,
        };
        addedtransaction = mydata;
      }
    } catch (e) {
      addedtransaction = undefined;
    }
    res.status(addedtransaction === undefined ? 500 : 200).json({
      status: addedtransaction === undefined ? 500 : 200,
      data: addedtransaction === undefined ? 'route doesnt exist' : mydata,
    });
  }

  static async getTransactionByaccount(req, res) {
    try{
    const AccountExist = await AccountService.CheckifAccountExist(req.params.accountNumber);
    let Allaccount;
    if (AccountExist != undefined) {
      Allaccount = await TransactionService.getTransactionbyAccount(AccountExist.id, res);
      if(Allaccount === undefined || Allaccount === null) { 
        Allaccount = 'empty';
      }else{
      Allaccount.accountNumber = parseInt(req.params.accountNumber, 10);
      delete Allaccount.user_id;
      }
    }
    return res.status(Allaccount === undefined ? 422 : 200).json({
      status: Allaccount === undefined ? 422 : 200,
      Data: Allaccount === undefined ? 'account does not Exists' : Allaccount,
    });
    } catch (e) {
      console.log('error',e);
     return res.status(500).json({err: 'internal server error'});
    }
  }
}

export default TransactionController;
