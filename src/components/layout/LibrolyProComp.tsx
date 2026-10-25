import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";

const LibrolyProComp: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<string>(localStorage.getItem('userPlan') || 'basic');
  const [showPlanDialog, setShowPlanDialog] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const plans = [
    {
      name: 'Libroly Basic',
      price: '4,99',
      type: 'basic',
      perks: [
        'Verificado en tu cuenta',
        'Soporte por email',
        'Aparece en búsquedas',
        'Acceso a estadísticas básicas',
      ],
      color: 'from-gray-100 to-gray-200',
      highlight: false,
    },
    {
      name: 'Libroly Plus',
      price: '9,99',
      type: 'pro',
      perks: [
        'Verificado en tu cuenta',
        'Soporte prioritario 24/7',
        'Aparece primero en ventas',
        'Estadísticas avanzadas',
      ],
      color: 'from-coral-100 to-coral-200',
      highlight: true,
    },
    {
      name: 'Libroly Pro',
      price: '19,99',
      type: 'premium',
      perks: [
        'Verificado en tu cuenta',
        'Soporte premium 24/7',
        'Destacado en la home',
        'Aparece primero en ventas',
        'Asesoría personalizada',
        'Acceso a campañas exclusivas',
      ],
      color: 'from-yellow-100 to-yellow-200',
      highlight: false,
    },
  ];

  const handleSubscription = async (planType: string) => {
    try {
      if (!isAuthenticated || !user) {
        setFeedbackMessage('Debes iniciar sesión para suscribirte a un plan');
        setShowFeedback(true);
        return;
      }

      const selectedPlan = plans.find(p => p.type === planType);
      if (!selectedPlan) return;

      setShowPlanDialog(false);
      setFeedbackMessage(`Tu suscripción cambiará a ${selectedPlan.name} (€${selectedPlan.price}/mes) a partir del próximo ciclo de facturación.`);
      setShowFeedback(true);
      
      // Primero actualizamos el estado de verificación del usuario
      try {
        await api.updateUserVerification();
        setCurrentPlan(planType);
        localStorage.setItem('userPlan', planType);
      } catch (error) {
        console.error('Error al actualizar verificación:', error);
        setFeedbackMessage('Error al actualizar tu plan. Por favor, inténtalo de nuevo.');
        setShowFeedback(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setFeedbackMessage('Ha ocurrido un error al procesar tu suscripción. Por favor, inténtalo de nuevo.');
      setShowFeedback(true);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      if (!user) return;
      
      if (window.confirm('¿Estás seguro de que quieres cancelar tu suscripción? Perderás el acceso a las funciones premium y el estado de verificación.')) {
        await api.updateUserVerification(false); // Actualizamos explícitamente a no verificado
        localStorage.removeItem('userPlan');
        setCurrentPlan('basic');
        setFeedbackMessage('Tu suscripción ha sido cancelada y los cambios se aplicarán al final del período de facturación actual.');
        setShowFeedback(true);
      }
    } catch (error) {
      console.error('Error al cancelar la suscripción:', error);
      setFeedbackMessage('Error al cancelar tu suscripción. Por favor, inténtalo de nuevo.');
      setShowFeedback(true);
    }
  };

  // Plan selection dialog component
  const PlanDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Cambiar plan</h2>
          <button onClick={() => setShowPlanDialog(false)} className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="grid gap-4 mb-6">
          {plans.map(plan => (
            <button
              key={plan.type}
              onClick={() => handleSubscription(plan.type)}
              className={`text-left p-4 rounded-xl border transition-all ${
                currentPlan === plan.type 
                  ? 'border-coral-500 bg-coral-50/50' 
                  : 'border-gray-200 hover:border-coral-200 hover:shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">€{plan.price}/mes</p>
                  <ul className="mt-3 space-y-1">
                    {plan.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="text-green-500 text-[10px]"><i className="fas fa-check"></i></span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
                {currentPlan === plan.type && (
                  <span className="text-coral-600">
                    <i className="fas fa-check-circle"></i>
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Feedback dialog component
  const FeedbackDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md m-4">
        <div className="text-center">
          <p className="text-gray-600 mb-6">{feedbackMessage}</p>
          <button
            onClick={() => setShowFeedback(false)}
            className="px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );

  // Si el usuario está verificado, mostramos el panel de gestión
  const userVerificado = (user as any)?.verificado;
  if (userVerificado === 1) {
    const currentPlanData = plans.find(p => p.type === currentPlan);
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi suscripción</h1>
                <p className="text-sm text-gray-500 mt-1">Gestiona tu plan de Libroly Pro</p>
              </div>
              <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Activo
              </span>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-medium text-gray-900">{currentPlanData?.name || 'Plan Básico'}</h2>
                  <p className="text-sm text-gray-600 mt-1">€{currentPlanData?.price || '4,99'}/mes</p>
                </div>
                <button
                  onClick={() => setShowPlanDialog(true)}
                  className="text-sm font-medium text-coral-600 hover:text-coral-700 transition-colors"
                >
                  Cambiar plan
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-xs font-medium text-gray-500 mb-2">Beneficios incluidos:</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {currentPlanData?.perks.slice(0, 4).map((perk, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="text-green-500 text-[10px]"><i className="fas fa-check"></i></span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleCancelSubscription}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancelar suscripción
              </button>
            </div>
          </div>
        </div>

        {showPlanDialog && <PlanDialog />}
        {showFeedback && <FeedbackDialog />}
      </main>
    );
  }

  // Si el usuario no está verificado, mostramos los planes
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Libroly Pro</h1>
          <p className="text-gray-600">
            Potencia tu presencia en Libroly con nuestros planes premium
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`bg-white rounded-xl p-6 shadow-sm border ${
                plan.highlight ? 'border-coral-500 md:scale-105 md:-translate-y-1' : 'border-gray-100'
              } transition-all`}
            >
              {plan.highlight && (
                <div className="text-xs font-medium text-coral-600 mb-2">Plan recomendado</div>
              )}
              <h2 className="font-bold text-xl text-gray-900 mb-1">{plan.name}</h2>
              <div className="text-2xl font-bold text-gray-900 mb-4">€{plan.price}<span className="text-base font-normal text-gray-500">/mes</span></div>
              <ul className="space-y-2 mb-6">
                {plan.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500 text-xs"><i className="fas fa-check"></i></span>
                    {perk}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleSubscription(plan.type)}
                className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                  plan.highlight 
                    ? 'bg-coral-500 text-white hover:bg-coral-600' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {currentPlan === plan.type ? 'Plan actual' : 'Seleccionar'}
              </button>
            </div>
          ))}
        </div>

        <div className="max-w-lg mx-auto text-center text-sm text-gray-500">
          <p>
            Todos los planes incluyen verificación de cuenta, soporte prioritario y herramientas avanzadas para hacer crecer tu presencia en Libroly.
          </p>
        </div>

        {showPlanDialog && <PlanDialog />}
        {showFeedback && <FeedbackDialog />}
      </div>
    </main>
  );
};

export default LibrolyProComp;