import React from "react";
import SmallModal from "../layout/SmallModal";
import UpgradeForm from "./UpgradeForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const UpgradeModal = ({
  open,
  setOpen,
  setLoading,
  getSubscriptionInformation,
}) => {
  const stripePromise = loadStripe(
    "pk_test_51FuTd1E5eS8rS5Q2BTPb8elKj6kQQtMOBi3E1HYWgIL5jAKJv5QGv0UNk6NX4tpEhBbSDVGTYW1Pyo8h2mfNKhR000SiPavZ9R"
  );
  return (
    open && (
      <SmallModal
        open={open}
        setOpen={setOpen}
        title="Upgrade Plan"
        size={"-md"}
      >
        <Elements stripe={stripePromise}>
          <UpgradeForm
            setOpen={setOpen}
            setLoading={setLoading}
            getSubscriptionInformation={getSubscriptionInformation}
          />
        </Elements>
      </SmallModal>
    )
  );
};

export default UpgradeModal;
