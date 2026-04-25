// {
//     "account_number": "12345",
//     "balance": 500.00,
//     "currency": "PHP",
//     "status": "ACTIVE",
//     "_links": {
//         "self": { "href": "/accounts/12345" },
//         "deposit": { "href": "/accounts/12345/deposit", "method": "POST" },
//         "withdraw": { "href": "/accounts/12345/withdraw", "method": "POST" },
//         "transfer": { "href": "/accounts/12345/transfer", "method": "POST" }
//     }
// }


// means adding some restraints from features, 
// exammle when balance reach to 0, the methods or links with withdraw of transfer will be unavailable 