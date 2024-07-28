"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDragHandle } from "react-icons/md";

export interface Link {
  platform: string;
  url: string;
}

const platformsList = [
  "GitHub",
  "Frontend Mentor",
  "Twitter",
  "LinkedIn",
  "Youtube",
  "Facebook",
  "Twitch",
  "Dev.to",
  "Codewars",
  "Codepen",
  "FreeCodeCamp",
  "GitLab",
  "Hashnode",
  "Stack Overflow",
];

const page = () => {
  const [inputs, setInputs] = useState<Link[]>([]);

  const addInput = () => {
    setInputs([...inputs, { platform: "", url: "" }]);
  };

  const removeInput = (index: number) => {
    setInputs(inputs.splice(index, 1));
  };

  return (
    <div className="w-full flex justify-center p-6 md:p-10">
      {/* <div className='w-[40%] flex justify-center'>
        <img src="/images/phone.svg" alt="phone mockup" className='h-[70%]'/>
      </div> */}
      <div className="md:w-[60%] flex flex-col items-center">
        <h1 className="text-[#333333] font-bold text-2xl md:text-3xl">
          Customize your links
        </h1>
        <p className="text-[#737373] mt-1 text-sm md:text-base">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <button
          className="flex justify-center items-center mt-3 w-full md:w-[90%] border-2 border-main p-2 rounded-lg text-main font-semibold gap-1 bg-white hover:bg-[#EFEBFF] sticky top-20"
          onClick={() => addInput()}
        >
          <FaPlus />
          <span className="block">Add new link</span>
        </button>
        <div className="flex flex-col justify-center items-center mt-5 p-5 overflow-auto">
          {inputs.length === 0 ? (
            <>
              <img
                src="/images/middle.svg"
                alt="illustration"
                className="w-[70%] md:w-[30%]"
              />
              <h1 className="text-[#333333] font-bold text-2xl md:text-3xl">
                Let's get you started
              </h1>
              <p className="w-full md:w-[80%] text-center mt-2 md:mt-5 text-sm text-[#737373]">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We’re here to help
                you share your profiles with everyone!
              </p>
            </>
          ) : (
            <>
              <form className="w-full">
                {inputs.map((input, index) => (
                  <div className="w-full mt-3" key={index}>
                    <div className="w-full flex justify-between">
                      <div className="flex items-center text-[#737373] font-bold gap-1">
                        <MdOutlineDragHandle size={32}/>
                        <p>Link #{index + 1}</p>
                      </div>
                      <p className="text-[#737373] cursor-pointer">Remove</p>
                    </div>
                    <label htmlFor={`platform${index}`} className="text-xs">Platform</label>
                    <select name={`platform${index}`} id={`platform${index}`} className="mt-1 w-full border-[1px] p-3 rounded-lg outline-none">
                      {platformsList.map((platform, index) => (
                        <>
                          <option value={platform} key={index}>{platform}</option>
                        </>
                      ))}
                    </select>
                    <label htmlFor={`url${index}`} className="text-xs">Link</label>
                    <input type="url" name={`url${index}`} id={`url${index}`} className="w-full border-[1px] p-3 rounded-lg outline-none"/>
                  </div>
                ))}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
