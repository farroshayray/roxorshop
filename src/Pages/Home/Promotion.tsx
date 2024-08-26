import React from 'react';
import discountLogo from './Pictures/icons8-discount-100 (1).png';
import protectionLogo from './Pictures/icons8-protection-96.png';
import shippingLogo from './Pictures/icons8-shipping-100 (1).png';

const Promotion = () => {
  return (
    <section>
        <div className='flex flex-col  sm:min-h-lvh sm:flex-row'>
            <div className='bg-black flex-col justify-center flex'>
                <img src={discountLogo} alt="picture" className='mx-auto mt-16 max-w-16'/>
                <h3 className='text-center font-bold text-2xl mx-10 mt-10 text-white'>Limited Exclusive Products Every Month</h3>
                <p className='text-center mx-10 mt-10 mb-16 text-white'>We are committed to building customer trust and guarantee that the authenticity of our products cannot be imitated because we have an exclusive tag</p>
            </div>
            <div className='bg-white flex-col justify-center flex'>
                <img src={protectionLogo} alt="picture" className='mx-auto mt-16 max-w-16'/>
                <h3 className='text-center font-bold text-2xl mx-10 mt-10'>Confidentiality of Customer Data</h3>
                <p className='text-center mx-10 mt-10 mb-16'>We are also committed to maintaining the confidentiality of customer data, providing security in transactions, so that feeling safe when shopping is our priority</p>
            </div>
            <div className='bg-black flex-col justify-center flex'>
                <img src={shippingLogo} alt="picture" className='mx-auto mt-16 max-w-16'/>
                <h3 className='text-center font-bold text-2xl mx-10 mt-10 text-white'>Free Shipping</h3>
                <p className='text-center mx-10 mt-10 mb-16 text-white'>We provide free shipping for every product, you don't need to worry about expensive shipping costs, our reach reaches almost all countries</p>
            </div>
        </div>
    </section>
  )
}

export default Promotion