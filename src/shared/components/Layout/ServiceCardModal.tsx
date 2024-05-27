import React from 'react';

interface ServiceIconProps {
  gradientFrom: string;
  gradientTo: string;
  text: string;
  isDarkText: boolean;
  label?: string; // Optional label different from the icon text
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ gradientFrom, gradientTo, text, isDarkText, label }) => {
  return (
    <div className="flex flex-col items-center rounded-xl bg-slate-50 dark:bg-neutral-800">
      <div
        className={`font-cd-extended flex size-12 items-center justify-center rounded text:font-cd-be-extended text-md ${isDarkText ? 'text-black' : 'text-white'}`}
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        {text}
      </div>
      <div className="font-cd-extended mt-4 text-center text-xs text-black dark:text-white">
        {label || text} 
      </div>
    </div>
  );
};

const ServicesModalCard: React.FC = () => {
  return (
    <div className="w-full rounded-lg bg-slate-50 p-10 dark:bg-neutral-800">
      <div className="grid grid-cols-3 gap-4">
        <ServiceIcon gradientFrom="#22c55e" gradientTo="#bef264" text="Ad" isDarkText={true} label="Advertising" />
        <ServiceIcon gradientFrom="#fcd34d" gradientTo="#fef3c7" text="Am" isDarkText={true} label="Asset Management" />
        <ServiceIcon gradientFrom="#d97706" gradientTo="#fed7aa" text="Bm" isDarkText={true} label="Brand Management" />
        <ServiceIcon gradientFrom="#3B82F6" gradientTo="#312E81" text="Bw" isDarkText={false} label="Blog Writer" />
        <ServiceIcon gradientFrom="#16a34a" gradientTo="#1e3a8a" text="Dc" isDarkText={false} label="Design + Coding" />
        <ServiceIcon gradientFrom="#7dd3fc" gradientTo="#0e7490" text="Wm" isDarkText={false} label="Website Maintenance" />
        <ServiceIcon gradientFrom="#2e1065" gradientTo="#ca8a04" text="Em" isDarkText={false} label="Email & SMS Marketing" />
        <ServiceIcon gradientFrom="#ef4444" gradientTo="#2563eb" text="Pl" isDarkText={false} label="Product Launches" />
      </div>
    </div>
  );
}

export default ServicesModalCard;