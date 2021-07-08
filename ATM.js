
class account{
    constructor(name, password, balance){
        this.name = name;
        this.password = password;
        this.balance = balance;
    }
}
class ATM{
    constructor(accounts = [], activeUser)
    {
        this.accounts = accounts;
        this.activeUser = activeUser;

    }
    register(){
        let name = prompt("Please enter your account name:");
        let password = prompt("Please enter your password:");
        let deposit = prompt("Please enter initial deposit amount:")
        let newUser = new account (name, password, deposit);
        this.accounts.push(newUser);
        console.log(`${newUser.name} has successfully been registered.`)
        console.log(this.accounts);
       
    }
    
    login(){
        let name = prompt("Please enter your account name");
        let password = prompt("Please enter your password");
        let login = new account(name, password, 0);
        if(this.activeUser !== undefined){
            console.log("User already logged in, please logout.")
            this.logout(this.activeUser);
        }
        //This for loop isn't working how I want it to... it loops and answers for each index
        //so if my user isn't at index[0] it will not log in.  Then, when I "exit" it will continue
        //with the loop to index[1] and continue...
        //OR, if my user is at 0, I can do all the functions, but when I exit, it then loops back to 
        //index[1].      
        //       else{
        //           for(let i = 0; i <this.accounts.length; i++){
        //               
        //                if ( this.accounts[i].name === login.name && this.accounts[i].password === login.password){
        //                   
        //                   this.activeUser = this.accounts[i];
        //                   console.log(`You have successfully logged in: ${this.accounts[i].name}.`)
        //               }
        //               else if(this.accounts[i].name === login.name && this.accounts[i].password !== login.password)
        //               {
        //                   console.log(`${login.name}, your password is incorrect, please try again.`)
        //                   this.login();
        //               }
        //               else{
        //                   console.log("The name and password do not match.  Please try again.");
        //                   this.getFirstIntent();
        //               }
        //             }
        //          }

//this way of writing the method at least lets me log into any account immediately, and doesn't iterate and answer for each index.
//And I fixed the double exit issue...or I thought I did.

        else{

                let userRequest = this.accounts.find((account)=>(account.name === login.name));
                let passRequest = this.accounts.find((account)=>(account.password === login.password));
                if(userRequest !== undefined && userRequest === passRequest){
                    this.activeUser = userRequest;
                    console.log(`You have successfully logged in: ${userRequest.name}`) 
                }
                else{ 
                    console.log("The name and password do not match.  Please try again.");
                    this.getFirstIntent();
                }
        }
    }
    
    logout(){
        let user = this.activeUser.name;
        this.activeUser = undefined;
        console.log(`${user} has successfully logged out.`)
    }
    
    checkBalance(){
        if (this.activeUser !== null){
            console.log(`Your balance is: ${this.activeUser.balance}`);
        }
        else{
            console.log("You must be logged in to complete that function.");
        }
    }
    
    deposit(){
        if (this.activeUser === null){
            console.log("You must be logged in to complete that function.");
        }
        else{
            let add = prompt("How much would you like to deposit?");
            let newBalance = +this.activeUser.balance + +add;
            this.activeUser.balance = newBalance;
            console.log(`Your new account balance is: ${this.activeUser.balance}.`)
        }
    }
    withdraw(){
        if (this.activeUser === null){
            console.log("You must be logged in to complete that function.");
            this.getFirstIntent();
        }

        else{

            let sub = prompt("How much would you like to withdraw?");
            if(+this.activeUser.balance - sub < 0 ){
                console.log("Insufficient funds.  Transaction terminated.");
                this.getFirstIntent();
            }
            else{
                let newBalance = +this.activeUser.balance - +sub;
                this.activeUser.balance = newBalance;
                console.log(`Your new account balance is: ${this.activeUser.balance}.`);
                
            }

        }
    }
    
    getFirstIntent(){
        if(this.activeUser === undefined){
            let intention = prompt("Would you like to login(1), register a new account(2), or exit(3)?  Please enter the corresponding number.")
            if(intention ==="1")
                {
                    this.login();
                    this.getSecondIntent();
                
                }
            else if(intention === "2"){
                     this.register();
                     this.getFirstIntent();
                }
            else if(intention === "3"){

                console.log("Thanks for banking with GC ATM!");
                return;
            }
        }
    }
    getSecondIntent(){
        let action = prompt("What would you like to do?  Check balance(1), deposit(2), withdraw(3) or logout(4).  Please enter the corresponding number.")
        
        if(action === "1"){
                this.checkBalance();
            }
        else if(action === "2"){
                this.deposit();
            }
        else if(action === "3"){
                this.withdraw();
            }
        else if(action === "4"){
                this.logout();
                this.getFirstIntent();
            }
        else{
                console.log("That is not a valid response.");
                this.getSecondIntent();
            }
        
        this.getContinue();
        

    }
    getContinue(){
        let response = prompt("Would you like to continue your transaction? Y/N");
            if(response === "Y"){
                this.getSecondIntent();
            }
            else if(response === "N"){
                this.logout();
                this.getFirstIntent();
            }
            else{
                console.log("That was not a valid response.  Please try again.");
                this.getContinue();
            }
        }
    }

let atm = new ATM;
atm.accounts.push(new account("mag123", "pass456", 500));
atm.accounts.push(new account("user1", "pass2",40000));

console.log("Welcome to the GC ATM");
atm.getFirstIntent();



