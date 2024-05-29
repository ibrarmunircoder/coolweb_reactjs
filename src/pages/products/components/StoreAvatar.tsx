import React, { useState, useEffect } from 'react';

interface Store {
  store_name: string;
  store_url: string;
  timestamp: string;
}

interface StoreAvatarProps {
  storeName: string;
  onClick: () => void;
}

const StoreAvatar: React.FC<StoreAvatarProps> = ({ storeName, onClick }) => {
  const getAbbreviation = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map(word => word.charAt(0))
      .join('');
  };

  return (
    <div
      className="flex items-center justify-center size-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-900 font-cd-light text-white cursor-pointer"
      title={storeName}
      onClick={onClick}
    >
      {getAbbreviation(storeName)}
    </div>
  );
};

interface StoreSelectorProps {
  stores: Store[];
  setModelResponse: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedProducts: React.Dispatch<React.SetStateAction<any[]>>;
  setSearchParams: (params: { store: string; store_url: string }) => void;
  searchParams: URLSearchParams;
}

const StoreSelector: React.FC<StoreSelectorProps> = ({
  stores,
  setModelResponse,
  setProducts,
  setSelectedProducts,
  setSearchParams,
  searchParams
}) => {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [isListVisible, setIsListVisible] = useState(false);

  useEffect(() => {
    const store = searchParams.get('store');
    if (store) {
      setSelectedStore(store);
    }
  }, [searchParams]);

  const handleStoreSelect = (store: Store) => () => {
    if (selectedStore !== store.store_name) {
      setModelResponse('');
      setProducts([]);
      setSelectedProducts([]);
      setSearchParams({
        store: store.store_name,
        store_url: store.store_url,
      });
      setSelectedStore(store.store_name);
      setIsListVisible(false); // Hide the list after selecting a store
    }
  };

  return (
    <div>
      <StoreAvatar
        storeName={selectedStore || 'Select Store'}
        onClick={() => setIsListVisible(!isListVisible)}
      />
      {isListVisible && (
        <ul className='rounded-md'>
          {stores.map((store) => (
            <li
              onClick={handleStoreSelect(store)}
              style={{ cursor: 'pointer' }}
              className={`${
                selectedStore === store.store_name
                  ? '!bg-indigo-700 text-xs text-white font-bold p-4'
                  : '!bg-red-900 text-xs text-white p-4'
              }`}
              key={store.timestamp}
            >
              {store.store_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StoreSelector;
