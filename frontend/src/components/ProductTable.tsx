import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useFileUpload } from '../contexts/FileUploadContext';
import { useDebounce } from 'use-debounce';

interface Product {
  id: string;
  name: string;
  price: number;
  expiration: string;
  exchangeRates: Record<string, number>;
}

export const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'price' | 'expiration'>('name');
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedFilter] = useDebounce(filter, 300);

  const { file: uploaded } = useFileUpload();

  const fetchProducts = useCallback(async () => {
    try {
      const sanitizedFilter = filter.trim() !== '' ? filter : undefined;
      const response = await axios.get<{ products: Product[]; totalPages: number }>(
        `http://localhost:3000/products`,
        {
          params: {
            name: sanitizedFilter,
            sortBy: sortKey,
            order,
            page,
            limit: 10,
          },
        },
      );
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }, [debouncedFilter, sortKey, order, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, uploaded]);

  const displayProducts = useMemo(() => {
    return products.map((product) => ({
      ...product,
      formattedPrice: Number(product.price).toFixed(2),
    }));
  }, [products]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Uploaded Products</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 flex-1"
        />
        <select
          onChange={(e) => setSortKey(e.target.value as 'name' | 'price' | 'expiration')}
          className="border p-2"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="expiration">Sort by Expiration</option>
        </select>
        <select onChange={(e) => setOrder(e.target.value as 'ASC' | 'DESC')} className="border p-2">
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price (USD)</th>
            <th className="border p-2">Expiration</th>
            <th className="border p-2">Exchange Rates</th>
          </tr>
        </thead>
        <tbody>
          {displayProducts.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">${product.formattedPrice}</td>
              <td className="border p-2">{product.expiration}</td>
              <td className="border p-2">
                <details>
                  <summary className="cursor-pointer text-blue-500">View Rates</summary>
                  <ul>
                    {Object.entries(product.exchangeRates).map(([currency, convertedPrice]) => (
                      <li key={currency}>
                        {currency}: {convertedPrice.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="p-2 border disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="p-2 border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
