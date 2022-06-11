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
    "pk_live_51FuTd1E5eS8rS5Q2BVulz7l7vh0YfoTD7s1saCidaozzz8Lyw3ztrwkAOkTcEbZemRrcl3yalrdGxTnBLZAFzWVX00GTuGNgIV"
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
