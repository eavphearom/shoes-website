import { ShieldCheck } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import abaLogo from "../../../assets/payment/aba.jpeg";
import khqrLogo from "../../../assets/payment/qr.png";

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

export default function PaymentQrModal({ isOpen, onClose, total }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment" size="lg">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl bg-[#F8FAFC] p-5 text-center">
          <div className="mx-auto flex h-12 w-24 items-center justify-center rounded-xl bg-white px-3 shadow-sm">
            <img src={abaLogo} alt="ABA Pay" className="max-h-8 max-w-full object-contain" />
          </div>
          <div className="mt-5 rounded-2xl border border-[#E6EAF0] bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
            <img src={khqrLogo} alt="KHQR payment code" className="mx-auto aspect-square w-full max-w-[260px] object-contain" />
          </div>
          <p className="mt-4 text-xs font-medium text-[#64748B]">Scan with your banking app to pay securely.</p>
        </div>

        <div className="flex flex-col justify-between gap-5">
          <div>
            <p className="font-michroma text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E96400]">Go Shoes Payment</p>
            <h3 className="mt-3 text-2xl font-semibold text-[#07182E]">Pay {formatPrice(total)}</h3>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">Please scan the QR code and complete your payment. Keep this modal open until the transaction is finished.</p>
          </div>

          <div className="rounded-2xl border border-[#E6EAF0] bg-white p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-[#64748B]">Order total</span>
              <span className="font-semibold text-[#07182E]">{formatPrice(total)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="font-medium text-[#64748B]">Payment method</span>
              <span className="font-semibold text-[#07182E]">KHQR / ABA</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="font-medium text-[#64748B]">Delivery</span>
              <span className="font-semibold text-[#07182E]">J&T Express</span>
            </div>
          </div>

          <div className="rounded-2xl bg-[#FFF7F0] p-4">
            <div className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#E96400]">
                <ShieldCheck size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#07182E]">Secure checkout</p>
                <p className="mt-1 text-xs leading-5 text-[#64748B]">Your order will be confirmed after successful payment verification.</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-12 w-full cursor-pointer rounded-xl bg-[#E96400] text-sm font-semibold text-white transition hover:bg-[#C95500]"
          >
            I have paid
          </button>
        </div>
      </div>
    </Modal>
  );
}
