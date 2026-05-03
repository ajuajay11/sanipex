 
import { logo } from "../../common";
export default function Preloader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#faf9f7]">
 
       <div className="absolute top-0 left-0 h-[2px] w-full overflow-hidden bg-[#e8e4de]">
        <div className="absolute top-0 left-[-45%] h-full w-[45%] animate-[pl-slide_1.4s_cubic-bezier(0.4,0,0.2,1)_infinite] bg-[#1a1a1a]" />
      </div>
 
      <div className="flex flex-col items-center gap-7">
 <img src={logo} alt="Sanipex Group" className="h-12 w-auto p-3" />
         <div className="flex items-end gap-1.5 h-9">
          <span className="block w-[3px] h-4 rounded-sm bg-[#1a1a1a] animate-[pl-bar_1.1s_ease-in-out_infinite] [animation-delay:0ms]" />
          <span className="block w-[3px] h-7 rounded-sm bg-[#1a1a1a] animate-[pl-bar_1.1s_ease-in-out_infinite] [animation-delay:150ms]" />
          <span className="block w-[3px] h-5 rounded-sm bg-[#1a1a1a] animate-[pl-bar_1.1s_ease-in-out_infinite] [animation-delay:300ms]" />
        </div>
  
      </div>
 
      <style>{`
        @keyframes pl-slide {
          0%   { left: -45%; }
          100% { left: 110%; }
        }
        @keyframes pl-bar {
          0%, 100% { transform: scaleY(1);   opacity: 0.25; }
          50%       { transform: scaleY(1.5); opacity: 1; }
        }
        @keyframes pl-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </div>
   );
}
 