import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <section className='mt-10 flex items-center justify-center'>
        <div>
          <Image src='/404.png' alt='404' width={400} height={400} />
          <div className='mt-6 text-center'>
            <h2 className='text-2xl font-bold'>Oops! Admin Page Not Found</h2>
            {/* <div className='flex items-center justify-center'>
              <button className='mt-2 bg-primary hover:bg-primary/90 text-white px-4 md:px-6 py-3 text-sm rounded-full font-semibold transition-colors duration-200'>
                Back to Home
              </button>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
