
    // let base_currency = 'i get the id of the currency of the amount the person wants to convert';
    // let base_amount = 'i get the amount the person wants to convert';
    // let base_balance = 'i get the balance of the wallet from where the person wants to convert';

    // if(base_amount > base_balance){
    //     base_amount = base_balance //
    // }
    // let target_currency = 'i get the id of the current that the person wants to receive'

    // let target_amount = getTargetAmount(base_currency,target_currency,base_amount);
    
    // let total_charge = getCharges(base_currency,target_currency,target_amount); // charges for the exchange
    
    // let total_receive = target_amount - total_charge //what the customer will receive after exchange and charges
    // let rate = getTargetAmount(base_currency,target_currency,1); //rate conversion of 1 base_amount to target amount.. e.g 1 USD to NGN
    
    // // let rates = 'all the rates from rates api'
    let dollar = 'only dollar rate'

    export function getTargetAmount(rates , base_currency,target_currency,base_amount = 1){
        let result = rates.find(function (obj){
            return obj.base_currency == base_currency && obj.target_currency == target_currency;
        })
        if(result){
            return parseFloat(parseFloat(base_amount) * parseFloat(result.buying_amount)).toFixed(5);
        }
        
        result = rates.find(function (obj){
            return obj.base_currency == target_currency && obj.target_currency == base_currency;
        })
        if(result){
            return parseFloat(parseFloat(base_amount) / parseFloat(result.selling_amount)).toFixed(5);
        }

        //e.g btcusd to ethusd (btc - eth)
        let up = rates.find(function (obj){
            return obj.base_currency == base_currency && obj.target_currency == dollar;       
        })
        let down = rates.find(function (obj){
            return obj.base_currency == target_currency && obj.target_currency == dollar;       
        })
        if(up && down){
            return parseFloat( parseFloat(base_amount) * parseFloat(up.buying_amount)/ parseFloat(down.selling_amount) ).toFixed(5); 
        }


        //e.g usdngn to btcusd (ngn - btc)
        let first = rates.find(function (obj){
            return obj.base_currency == dollar &&  obj.target_currency == base_currency;       
        })
        let last = rates.find(function (obj){
            return obj.base_currency == target_currency && obj.target_currency == dollar;       
        })
        if(first && last){
            return parseFloat( parseFloat(base_amount) / parseFloat(first.selling_amount)/ parseFloat(last.selling_amount) ).toFixed(5); 
        }

        //e.g btcusd to usdngn (btc - ngn)
        let one = rates.find(function (obj){
            return obj.base_currency == base_currency &&  obj.target_currency == dollar ;       
        })
        let two = rates.find(function (obj){
            return obj.base_currency == dollar && obj.target_currency == target_currency;       
        })
        if(one && two){
            return parseFloat( parseFloat(base_amount) * parseFloat(one.buying_amount) * parseFloat(two.buying_amount) ).toFixed(5); 
        }

        if(base_currency == target_currency){
            return parseFloat(base_amount);
        } 
        return undefined; 
    }

    export function getCharges(rates, base_currency,target_currency,target_amount){
        let charge = 'percentage charges for exchange.. get this from settings api';
        let charges = 0;

        let result = rates.find(function (obj){
            return obj.base_currency === base_currency && obj.basecurrency?.code === 'NGN';
        })


        if(result){
            return charges;
        }

        console.log('res 1', result)


        result = rates.find(function (obj){
            return obj.target_currency === target_currency && obj.basecurrency?.code === 'NGN';
        })

        console.log('res 1', result)


        if(result){
            return charges;
        }

        result = rates.find(function (obj){
            return obj.target_currency === base_currency && obj.basecurrency?.code === 'NGN';
        })
        console.log('res 2', result)


        if(result){
            return charges;
        }
        result = rates.find(function (obj){
            return obj.base_currency === target_currency && obj.basecurrency?.code === 'NGN';
        })


        if(result){
            return charges;
        }
        console.log('res 3', result)

        if(base_currency === target_currency){
            return charges;
        }
        console.log('res', result)

        charges += parseFloat(parseFloat(charge) * parseFloat(target_amount) / 100);
        return charges.toLocaleString('fullwide',{useGrouping:true,maximumSignificantDigits:6});
    }
    
    

    
