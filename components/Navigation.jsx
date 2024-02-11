import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="bg-gray-800 h-full text-white p-4">
      <ul className="space-y-4">
        <li>
          <Link href="/">
            <div className="block py-2 px-4 hover:bg-gray-700 cursor-pointer">Home</div>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <div className="block py-2 px-4 hover:bg-gray-700 cursor-pointer">About</div>
          </Link>
        </li>
        <li>
          <Link href="/dayRun">
            <div className="block py-2 px-4 hover:bg-gray-700 cursor-pointer">Day Run</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
