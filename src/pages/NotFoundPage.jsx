import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[calc(100vh-104px)] items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-xl text-center">
        <p className="select-none text-[112px] font-bold leading-none tracking-tight text-[#fae5d6] sm:text-[136px]">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-[#03152B] sm:text-3xl">
          Not Found
        </h1>

        <div className="mt-6 flex flex-col items-center  justify-center gap-3 sm:flex-row">
          <Button
            onClick={() => navigate("/")}
            className="h-10 w-full gap-2 sm:w-auto bg-[#fb7a1d] text-[#03152B] hover:bg-[#f0d9c6]"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Button>

          
        </div>

        
      </div>
    </section>
  );
}
