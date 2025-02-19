import Link from "next/link";

const Footer = () => {
  return (
    <section className="flex justify-center items-center pt-[60px] w-full px-4">
      <div className="flex flex-col md:flex-row sm:mx-auto text-[14px] text-primary mt-11 lg:w-[640px] w-full">
        <div className="md:mr-8 mb-8 pr-2">
          <img src="roadMapLogo.svg" alt="logo" />
        </div>

        <div className="flex flex-col md:flex-row flex-wrap md:gap-[4rem]">
          <div className="flex flex-row lg:gap-20 justify-between">
            <div className="flex flex-col gap-2 flex-1">
              <h3 className="mb-2 font-bold text-[10px]">COMMUNITY</h3>
              <div><Link href="#">Twitter</Link></div>
              <div><Link href="#">Facebook</Link></div>
              <div><Link href="#">Youtube</Link></div>
              <div><Link href="#">Kingschat</Link></div>
              <div><Link href="#">Tictok</Link></div>
              <div><Link href="#">Instagram</Link></div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="mb-2 font-bold text-[10px]">COMPANY</h3>
              <div><Link href="#">About</Link></div>
              <div><Link href="#">Roadmap</Link></div>
              <div><Link href="#">Meet the mind</Link></div>
              <div className="font-semibold"><Link href="#" >App (coming soon)</Link></div>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-1 md:pt-0 pt-6">
            <h3 className="mb-2 font-bold text-[10px]">CONTACT</h3>
            <div><Link href="tel:+2349024956996">+2349024956996</Link></div>
            <div><Link href="mailto:support@earthinc.io">Support@earthinc.io</Link></div>
          </div>

        </div>
      </div>
    </section>

  );
};

export default Footer;
