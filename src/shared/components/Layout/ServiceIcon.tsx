import React from 'react';

interface ServiceIconProps {
  gradientFrom: string;
  gradientTo: string;
  text: string;
  isDarkText: boolean;  // Added prop to determine text color
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ gradientFrom, gradientTo, text, isDarkText }) => {
  const style = {
    background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`
  };

  const textColorClass = isDarkText ? 'text-black' : 'text-white';

  return (
    <button style={style} className={`rounded-md size-12 font-cd-extended text-center text-md ${textColorClass}`}>
      {text}
    </button>
  );
}

export default ServiceIcon;