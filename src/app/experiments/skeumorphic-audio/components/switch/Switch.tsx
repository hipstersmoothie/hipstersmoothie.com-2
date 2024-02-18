"use client";

import React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export const Switch = () => (
  <div className="flex flex-col">
    <div className="flex justify-between px-0.5">
      <div className="flex gap-0.5 w-[37px]">
        <div className="uppercase text-[8px] text-[#8F9DBC]">off</div>
        <div
          className="
            h-3 flex-1
            mt-1
            border-t-2 border-r-2 rounded-tr border-[#CFDDEA]
            mb-0.5
          "
          style={{
            boxShadow: "inset -1px 1px 0px 0px #F1F5FB",
          }}
        />
      </div>
      <div className="flex gap-0.5 w-[37px]">
        <div
          className="
            h-3 flex-1
            mt-1
            border-t-2 border-l-2 rounded-tl border-[#CFDDEA]
            mb-0.5
          "
          style={{
            boxShadow: "inset 1px 1px 0px 0px #F1F5FB",
          }}
        />
        <div className="uppercase text-[8px] text-[#8F9DBC]">on</div>
      </div>
    </div>
    <SwitchPrimitive.Root
      className=" 
        w-[100px] h-[40px] 
        bg-[#D4DDEB] rounded-full 
        relative 
        cursor-default
        shadow-[inset_0px_2px_8px_4px_#A1B5CE]
        focus:outline-none
        focus-visible:ring-offset-2 focus-visible:ring-offset-[#E5ECF7] 
        focus-visible:ring-2
      "
      id="airplane-mode"
    >
      <SwitchPrimitive.Thumb
        className="
          group
          flex w-fit
          bg-white rounded-full 
          transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[27px]
          p-0.5
        "
        style={{
          background: "linear-gradient(-45deg, #E7F0FB 40%, #F5F9FD 100%)",
          boxShadow:
            "0px 16px 30px 0px rgba(0, 0, 0, 0.1), 0px 16px 25px 0px #A1B5CE4f",
        }}
      >
        <div
          className="w-[32px] h-[32px] rounded-full"
          style={{
            background: "linear-gradient(-30deg, #F1F7FD 0%,  #F9FBFF 100%)",
            boxShadow:
              "inset -1px -1px 8px 0px white, inset 3px 3px 8px 1px oklch(0.92 0.02 253.46 / 1)",
          }}
        />
        <div className="w-1 flex items-center justify-center">
          {/* ,#FAF6DF_0%,#F1B8B1_100% */}
          <div
            className="
              w-0.5 h-[16px] rounded-full 
              bg-[linear-gradient(0,#D7E0F2_0%,#CEDAEB_100%)]
              group-data-[state=checked]:bg-[radial-gradient(circle_at_center,#FAF6DF_60%,#FE9944_70%,rgba(204,204,204,0)),linear-gradient(0,#181C36_0%,#181C36_100%)]
              group-data-[state=checked]:bg-[length:2px_8px,2px_16px]
              group-data-[state=checked]:bg-[position:center_1px,center_bottom]
              group-data-[state=checked]:shadow-[inset_0px_0px_1px_0px_#FE9944,0px_0px_2px_0px_white]
              bg-no-repeat
            "
          />
        </div>
        <div
          className="w-[32px] h-[32px] rounded-full"
          style={{
            background: "linear-gradient(-30deg, #F1F7FD 0%,  #F9FBFF 100%)",
            boxShadow:
              "inset -1px -1px 8px 0px white, inset 3px 3px 8px 5px #E4F0FD",
          }}
        />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  </div>
);
