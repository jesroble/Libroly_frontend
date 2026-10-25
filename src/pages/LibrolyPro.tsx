import React from "react";
import { useAuth } from '../contexts/AuthContext';
import LibrolyProComp from "../components/layout/LibrolyProComp";
import LibrolyProPanelComp from "../components/layout/LibrolyProPanelComp";

const LibrolyPro: React.FC = () => {
    const { user } = useAuth();
    const userVerificado = (user as any)?.verificado;

    return userVerificado === 1 ? <LibrolyProPanelComp /> : <LibrolyProComp />;
};

export default LibrolyPro;