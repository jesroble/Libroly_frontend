const ProfileSales = ({ setIsEditing, isEditing, }
: 
{ setIsEditing: (val: string) => void; isEditing: string; }) => {
    return (
        <div className="flex flex-col items-center gap-2 mt-6">
            <div className="flex gap-2 mb-2">
                <img src="images/logo.png" alt="imagen" className="w-10 h-10 rounded-full border-2 border-coral-200 bg-white shadow-sm" />
                <img src="images/logo.png" alt="imagen" className="w-10 h-10 rounded-full border-2 border-coral-200 bg-white shadow-sm" />
                <img src="images/logo.png" alt="imagen" className="w-10 h-10 rounded-full border-2 border-coral-200 bg-white shadow-sm" />
            </div>
            {isEditing == "info" && (
                <button
                    onClick={() => setIsEditing("newSales")}
                    className="flex items-center gap-2 text-base font-semibold rounded-full bg-coral-500 hover:bg-coral-600 text-white px-6 py-2 shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-coral-400 focus:ring-offset-2 mt-2"
                >
                    Crear venta
                </button>
            )}
        </div>
    );
};

export default ProfileSales;