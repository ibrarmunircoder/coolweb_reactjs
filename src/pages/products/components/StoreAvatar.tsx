import { UserStores } from '@/API';
import { Product } from '@/types';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './StoreAvatar.css'


type UserStoresType = Omit<UserStores, 'products'>;

interface StoreAvatarProps {
  storeName: string;
  onClick: () => void;
}

const StoreAvatar: React.FC<StoreAvatarProps> = ({ storeName, onClick }) => {
  const getAbbreviation = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join('');
  };

  return (
    <div
      className="flex items-center justify-center size-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-900 font-cd-light text-sm text-white cursor-pointer"
      title={storeName}
      onClick={onClick}
    >
      {getAbbreviation(storeName)}
    </div>
  );
};

interface StoreSelectorProps {
  stores: UserStoresType[];
  setModelResponse: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>;
}

const StoreSelector: React.FC<StoreSelectorProps> = ({
  stores,
  setModelResponse,
  setProducts,
  setSelectedProducts,
}) => {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isListVisible, setIsListVisible] = useState(false);

  useEffect(() => {
    const store = searchParams.get('store');
    if (store) {
      setSelectedStore(store);
    }
  }, [searchParams]);

  const handleStoreSelect = (store: UserStoresType) => () => {
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
        <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-900 p-2 store-list">
          <ul>
            {stores.map((store) => (
              <li
                onClick={handleStoreSelect(store)}
                style={{ cursor: 'pointer' }}
                className={`${
                  selectedStore === store.store_name
                    ? 'text-xs text-white p-4 rounded-lg font-cd-light bg-black'
                    : 'text-xs text-white p-4 rounded-lg font-cd-light'
                }`}
                key={store.timestamp}
              >
                {store.store_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StoreSelector;
