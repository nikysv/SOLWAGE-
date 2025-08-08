import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const countries = [
  { code: "US", name: "Estados Unidos", flag: "🇺🇸", phoneCode: "+1" },
  { code: "MX", name: "México", flag: "🇲🇽", phoneCode: "+52" },
  { code: "ES", name: "España", flag: "🇪🇸", phoneCode: "+34" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", phoneCode: "+54" },
  { code: "CO", name: "Colombia", flag: "🇨🇴", phoneCode: "+57" },
  { code: "PE", name: "Perú", flag: "🇵🇪", phoneCode: "+51" },
  { code: "CL", name: "Chile", flag: "🇨🇱", phoneCode: "+56" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪", phoneCode: "+58" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨", phoneCode: "+593" },
  { code: "BO", name: "Bolivia", flag: "🇧🇴", phoneCode: "+591" },
  { code: "PY", name: "Paraguay", flag: "🇵🇾", phoneCode: "+595" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾", phoneCode: "+598" },
  { code: "BR", name: "Brasil", flag: "🇧🇷", phoneCode: "+55" },
  { code: "CA", name: "Canadá", flag: "🇨🇦", phoneCode: "+1" },
  { code: "GB", name: "Reino Unido", flag: "🇬🇧", phoneCode: "+44" },
  { code: "DE", name: "Alemania", flag: "🇩🇪", phoneCode: "+49" },
  { code: "FR", name: "Francia", flag: "🇫🇷", phoneCode: "+33" },
  { code: "IT", name: "Italia", flag: "🇮🇹", phoneCode: "+39" },
  { code: "JP", name: "Japón", flag: "🇯🇵", phoneCode: "+81" },
  { code: "KR", name: "Corea del Sur", flag: "🇰🇷", phoneCode: "+82" },
  { code: "CN", name: "China", flag: "🇨🇳", phoneCode: "+86" },
  { code: "IN", name: "India", flag: "🇮🇳", phoneCode: "+91" },
  { code: "AU", name: "Australia", flag: "🇦🇺", phoneCode: "+61" },
  { code: "NZ", name: "Nueva Zelanda", flag: "🇳🇿", phoneCode: "+64" },
  { code: "RU", name: "Rusia", flag: "🇷🇺", phoneCode: "+7" },
  { code: "ZA", name: "Sudáfrica", flag: "🇿🇦", phoneCode: "+27" },
  { code: "EG", name: "Egipto", flag: "🇪🇬", phoneCode: "+20" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", phoneCode: "+234" },
  { code: "KE", name: "Kenia", flag: "🇰🇪", phoneCode: "+254" },
  { code: "MA", name: "Marruecos", flag: "🇲🇦", phoneCode: "+212" },
  { code: "SA", name: "Arabia Saudita", flag: "🇸🇦", phoneCode: "+966" },
  { code: "AE", name: "Emiratos Árabes Unidos", flag: "🇦🇪", phoneCode: "+971" },
  { code: "TR", name: "Turquía", flag: "🇹🇷", phoneCode: "+90" },
  { code: "IL", name: "Israel", flag: "🇮🇱", phoneCode: "+972" },
  { code: "TH", name: "Tailandia", flag: "🇹🇭", phoneCode: "+66" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", phoneCode: "+84" },
  { code: "MY", name: "Malasia", flag: "🇲🇾", phoneCode: "+60" },
  { code: "SG", name: "Singapur", flag: "🇸🇬", phoneCode: "+65" },
  { code: "PH", name: "Filipinas", flag: "🇵🇭", phoneCode: "+63" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", phoneCode: "+62" },
  { code: "PK", name: "Pakistán", flag: "🇵🇰", phoneCode: "+92" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", phoneCode: "+880" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰", phoneCode: "+94" },
  { code: "NP", name: "Nepal", flag: "🇳🇵", phoneCode: "+977" },
  { code: "MM", name: "Myanmar", flag: "🇲🇲", phoneCode: "+95" },
  { code: "KH", name: "Camboya", flag: "🇰🇭", phoneCode: "+855" },
  { code: "LA", name: "Laos", flag: "🇱🇦", phoneCode: "+856" },
  { code: "MN", name: "Mongolia", flag: "🇲🇳", phoneCode: "+976" },
  { code: "KZ", name: "Kazajistán", flag: "🇰🇿", phoneCode: "+7" },
  { code: "UZ", name: "Uzbekistán", flag: "🇺🇿", phoneCode: "+998" },
  { code: "KG", name: "Kirguistán", flag: "🇰🇬", phoneCode: "+996" },
  { code: "TJ", name: "Tayikistán", flag: "🇹🇯", phoneCode: "+992" },
  { code: "TM", name: "Turkmenistán", flag: "🇹🇲", phoneCode: "+993" },
  { code: "AZ", name: "Azerbaiyán", flag: "🇦🇿", phoneCode: "+994" },
  { code: "GE", name: "Georgia", flag: "🇬🇪", phoneCode: "+995" },
  { code: "AM", name: "Armenia", flag: "🇦🇲", phoneCode: "+374" },
  { code: "BY", name: "Bielorrusia", flag: "🇧🇾", phoneCode: "+375" },
  { code: "MD", name: "Moldavia", flag: "🇲🇩", phoneCode: "+373" },
  { code: "UA", name: "Ucrania", flag: "🇺🇦", phoneCode: "+380" },
  { code: "PL", name: "Polonia", flag: "🇵🇱", phoneCode: "+48" },
  { code: "CZ", name: "República Checa", flag: "🇨🇿", phoneCode: "+420" },
  { code: "SK", name: "Eslovaquia", flag: "🇸🇰", phoneCode: "+421" },
  { code: "HU", name: "Hungría", flag: "🇭🇺", phoneCode: "+36" },
  { code: "RO", name: "Rumania", flag: "🇷🇴", phoneCode: "+40" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬", phoneCode: "+359" },
  { code: "HR", name: "Croacia", flag: "🇭🇷", phoneCode: "+385" },
  { code: "SI", name: "Eslovenia", flag: "🇸🇮", phoneCode: "+386" },
  { code: "RS", name: "Serbia", flag: "🇷🇸", phoneCode: "+381" },
  { code: "BA", name: "Bosnia y Herzegovina", flag: "🇧🇦", phoneCode: "+387" },
  { code: "ME", name: "Montenegro", flag: "🇲🇪", phoneCode: "+382" },
  { code: "MK", name: "Macedonia del Norte", flag: "🇲🇰", phoneCode: "+389" },
  { code: "AL", name: "Albania", flag: "🇦🇱", phoneCode: "+355" },
  { code: "GR", name: "Grecia", flag: "🇬🇷", phoneCode: "+30" },
  { code: "CY", name: "Chipre", flag: "🇨🇾", phoneCode: "+357" },
  { code: "MT", name: "Malta", flag: "🇲🇹", phoneCode: "+356" },
  { code: "IE", name: "Irlanda", flag: "🇮🇪", phoneCode: "+353" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", phoneCode: "+351" },
  { code: "NL", name: "Países Bajos", flag: "🇳🇱", phoneCode: "+31" },
  { code: "BE", name: "Bélgica", flag: "🇧🇪", phoneCode: "+32" },
  { code: "LU", name: "Luxemburgo", flag: "🇱🇺", phoneCode: "+352" },
  { code: "CH", name: "Suiza", flag: "🇨🇭", phoneCode: "+41" },
  { code: "AT", name: "Austria", flag: "🇦🇹", phoneCode: "+43" },
  { code: "SE", name: "Suecia", flag: "🇸🇪", phoneCode: "+46" },
  { code: "NO", name: "Noruega", flag: "🇳🇴", phoneCode: "+47" },
  { code: "DK", name: "Dinamarca", flag: "🇩🇰", phoneCode: "+45" },
  { code: "FI", name: "Finlandia", flag: "🇫🇮", phoneCode: "+358" },
  { code: "IS", name: "Islandia", flag: "🇮🇸", phoneCode: "+354" },
  { code: "EE", name: "Estonia", flag: "🇪🇪", phoneCode: "+372" },
  { code: "LV", name: "Letonia", flag: "🇱🇻", phoneCode: "+371" },
  { code: "LT", name: "Lituania", flag: "🇱🇹", phoneCode: "+370" },
];

const CountryPhoneSelector = ({
  selectedCountry,
  onCountryChange,
  phoneNumber,
  onPhoneChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Filtrar países basado en el término de búsqueda
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.phoneCode.includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (country) => {
    onCountryChange(country);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Número de Teléfono
      </label>

      <div className="flex">
        {/* Selector de país */}
        <div className="relative flex-shrink-0">
          <motion.button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-3 border border-r-0 rounded-l-lg bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg mr-2">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-gray-700 mr-1">
              {selectedCountry.phoneCode}
            </span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>

          {/* Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-1 w-80 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              >
                {/* Barra de búsqueda */}
                <div className="p-3 border-b border-gray-200">
                  <input
                    type="text"
                    placeholder="Buscar país..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    autoFocus
                  />
                </div>

                {/* Lista de países */}
                <div className="max-h-48 overflow-y-auto">
                  {filteredCountries.map((country) => (
                    <motion.button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-full flex items-center px-4 py-2 text-left hover:bg-purple-50 transition-colors duration-150"
                      whileHover={{ backgroundColor: "#f3e8ff" }}
                    >
                      <span className="text-lg mr-3">{country.flag}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {country.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {country.phoneCode}
                        </div>
                      </div>
                    </motion.button>
                  ))}

                  {filteredCountries.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                      No se encontraron países
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Campo de teléfono */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => onPhoneChange(e.target.value)}
          className={`flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Número de teléfono"
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CountryPhoneSelector;
