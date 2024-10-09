import React, { useState } from 'react';
import cyber from "./assets/cyber.gif"
import { ImSpinner2 } from "react-icons/im";
import { Toaster, toast } from 'sonner'

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.warning('Description is required!');
      return;
    }

    setloading(true);
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setloading(false);
    setResult(data.label === 1 ? 'Bullying detected' : 'No bullying detected');
  };

  return (
    <div>
      <Toaster richColors />
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <section className="text-gray-600 body-font relative">
        <div className='flex flex-col justify-center items-center' >
          <img src={cyber} className='h-52 w-52 my-7' alt='Cyber Bullying Detection' />
        </div>
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900">Cyber Bullying <span className='text-cyan-500'>Detection</span></h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-lg font-semibold">
              Words have power. <br />
              Let's ensure they heal, not harm.
              Together, we can detect and prevent cyber bullying.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="message" className="leading-7 text-lg text-gray-600 font-semibold">Description</label>
                  <textarea id="text" name="text" value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    placeholder='Enter the text description to analyze that it is cyber bullying or not'
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-900 focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full">
                <button onClick={handleSubmit} className="flex mx-auto text-white bg-cyan-500 border-0 py-2 px-8 focus:outline-none hover:bg-cyan-600 rounded-lg text-lg">
                  {loading ?
                    <div className='flex gap-2 items-center'>
                      <ImSpinner2 size={20} className='animate-spin' /> Analyzing...
                    </div>
                    : 'Analyze'}
                </button>
              </div>
              <div className='text-center flex items-center'>
                {result &&
                  <div className='font-bold text-3xl text-cyan-500'>
                    {result} !
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
