import { useState } from 'react';

export const useNewsletter = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    console.log('Email being typed:', newEmail);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Aquí simularemos un envío al backend
      console.log('Enviando email al servidor:', email);
      
      // Aquí podrías hacer una llamada real a tu API
      // const response = await fetch('tu-api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      // Por ahora solo simulamos un delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('¡Suscripción exitosa!', email);
      alert('¡Gracias por suscribirte a nuestro newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Error al suscribirse:', error);
      alert('Hubo un error al procesar tu suscripción. Por favor intenta de nuevo.');
    }
  };

  return {
    email,
    handleEmailChange,
    handleSubmit
  };
};
