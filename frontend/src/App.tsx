import { FileUpload } from './components/FileUpload';
import { ProductTable } from './components/ProductTable';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center bg-gray-100 p-12">
      <div className="p-4">
        <FileUpload />
      </div>
      <div className="p-4">
        <ProductTable />
      </div>
    </div>
  );
};
