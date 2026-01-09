import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-yellow-900/20 w-full text-white py-2 text-center text-[12px] lg:text-sm">
      <div className="space-y-1">
        <p>© {new Date().getFullYear()} Sabine EKLO.</p>
        <p className="text-gray-200 text-[10px] lg:text-xs font-bold">
          Développé avec React, TypeScript & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;