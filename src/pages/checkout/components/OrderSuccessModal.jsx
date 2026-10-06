import {
  Check,
  ShoppingBag,
  PackageSearch,
} from "lucide-react";

import { Link } from "react-router-dom";

import Modal from "../../../components/ui/Modal";


export default function OrderSuccessModal({
  isOpen,
  onClose,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="sm"
    >

      <div className="px-2 pb-3 pt-1 text-center">

        {/* Success icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#ECFDF3]">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#12A467] text-white">

            <Check
              size={27}
              strokeWidth={3}
            />

          </div>

        </div>


        {/* Title */}
        <h2 className="mt-6 text-2xl font-semibold text-[#07182E]">
          Order Placed Successfully!
        </h2>


        {/* Description */}
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#64748B]">
          Thank you for your order. We have received your order and
          will process it shortly.
        </p>


        {/* Optional small status */}
        <div className="mt-5 rounded-xl bg-[#F8FAFC] px-4 py-3">

          <p className="text-xs font-medium text-[#64748B]">
            Your order has been submitted successfully.
          </p>

        </div>


        {/* Buttons */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">

          <Link
            to="/shop"
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#E5EAF0] px-4 text-sm font-semibold text-[#07182E] transition hover:border-[#E96400] hover:text-[#E96400]"
          >
            <ShoppingBag size={17} />

            Continue Shopping
          </Link>


          <Link
            to="/orders"
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#E96400] px-4 text-sm font-semibold text-white transition hover:bg-[#C95500]"
          >
            <PackageSearch size={17} />

            View Order
          </Link>

        </div>

      </div>

    </Modal>
  );
}