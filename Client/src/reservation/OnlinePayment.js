import GooglePayButton from '@google-pay/button-react';
import { toast } from 'react-toastify';

const OnlinePayment = (props) => {
    const totalPrice = props.totalPrice.toString()
    console.log(totalPrice)
    return (<GooglePayButton
        environment="TEST"
        paymentRequest={
            {
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods:[{
                    type:'CARD',
                    parameters:{
                        allowedAuthMethods:['PAN_ONLY', "CRYPTOGRAM_3DS"],
                        allowedCardNetworks:['MASTERCARD','VISA']
                    },
                    tokenizationSpecification:{
                        type:'PAYMENT_GATEWAY',
                        parameters:{
                            gateway:'example',
                            gatewayMerchantId: 'exampleGatewayMerchantId'
                        }
                    }
                }],
                merchantInfo:{
                    merchantName: 'Example Merchant',
                    merchantId: '12345678901234567890'
                },
                transactionInfo:{
                    totalPriceStatus:'FINAL',
                    totalPriceLabel:'Total',
                    totalPrice:totalPrice,
                    currencyCode: 'RON',
                    countryCode:'RO'
                },
                callbackIntents:['PAYMENT_AUTHORIZATION']
            }
        }
        onLoadPaymentData={
            paymentRequest => {
                console.log('Succes',paymentRequest);
                toast.success("You payed successfully")
                props.setPayed(true)
            }
        }
        onPaymentAuthorized={
            paymentData=>{
                console.log('Payment authorized success', paymentData)
                return {transactionState:'SUCCESS'}
            }
        }
        buttonColor='white'
        buttonType='long'></GooglePayButton>);
}

export default OnlinePayment