import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment"
import { getCustomer } from "../../actions/payments";
import Loading from "../common/Loading";

const Checkout = (props) => {

    const dispatch = useDispatch();
    const { employeesAmount, amountPerMonth, period } = props.location.state;

    let loading = useSelector((state) => state.loading)
    let user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(getCustomer(user.profile.stripe_id));
      }, []);

    // const stripePromise = loadStripe(
    //     "pk_test_51FuTd1E5eS8rS5Q2BTPb8elKj6kQQtMOBi3E1HYWgIL5jAKJv5QGv0UNk6NX4tpEhBbSDVGTYW1Pyo8h2mfNKhR000SiPavZ9R"
    //   );
    const stripePromise = loadStripe(
    "pk_live_51FuTd1E5eS8rS5Q2BVulz7l7vh0YfoTD7s1saCidaozzz8Lyw3ztrwkAOkTcEbZemRrcl3yalrdGxTnBLZAFzWVX00GTuGNgIV"
    );
    return (
        <div className="premium__container">
            {loading.charge && <Loading />}
            <div className="premium flex-container--column-center">
                <h1 className="premium__title">Checkout</h1>
                <p className="premium__subtitle">Process your transaction</p>
                <div className="flex-container--center">
                    <Elements stripe={stripePromise}>
                        <Payment
                            amount={
                            period == "month"
                            ? amountPerMonth
                            : amountPerMonth * 12 - ((amountPerMonth * 12) / 100) * 20
                            }
                            total_employees={employeesAmount}
                            period={period}
                        />
                    </Elements>
                </div>
        </div>
    </div>
    )
}

export default Checkout