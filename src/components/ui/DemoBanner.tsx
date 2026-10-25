import React from 'react';
import { DEMO_ACCOUNT_EMAIL, resetDemoData } from '../../demo/demoApi';

const DemoBanner: React.FC = () => {
  const handleReset = () => {
    resetDemoData();
    window.location.assign('/');
  };

  return (
    <div className="bg-amber-100 text-amber-900 text-xs sm:text-sm px-4 py-2 text-center">
      <strong>Demo de portfolio:</strong> datos ficticios y sin backend. Los pagos son simulados y tus cambios
      solo se guardan en este navegador. Entra con <span className="font-mono">{DEMO_ACCOUNT_EMAIL}</span> y
      cualquier contraseña.{' '}
      <button type="button" onClick={handleReset} className="underline font-semibold hover:text-amber-700">
        Restablecer datos
      </button>
    </div>
  );
};

export default DemoBanner;
